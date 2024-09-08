// todo: this file needs proper env variables, error handling, testing, and logging!

"use server";
import OpenAI from "openai";
import {Message} from "@/app/types";
import {IngredientModel, MessageModel, MessageType} from "@/app/backend/models";
import {AnyItem} from "dynamoose/dist/Item";
import {QueryResponse} from "dynamoose/dist/ItemRetriever";

const client = new OpenAI();

const RECIPE_PROMPT = `\
salt,corn,sugar,soy,water,sodium,flour,milk,beans,citric_acid,starch,wheat,malt,garlic,vegetables,phosphate,calcium,onions,spices,wheat_flour,soybean_oil,sunflowers,niacin,canola_oil,riboflavin,yeast,corn_syrup,folic_acid,cultures,sunflower_oil,roses,artificial_flavors,noni,whey,organic,vegetable_oil,potassium,dextrose,butter,rice,cheese,iron,nuts,potatoes,protein,sea_salt,corn_starch,tin,oats,paprika,corn_oil,vinegar,fructose,chloride,carbon,glyceride,cheese_cultures,cottonseed_oil,cream,calcium_phosphate,peas,hydrogen,monoglycerides,yeast_extract,cocoa,reduced_iron,lactic_acid,palm_oil,sodium_phosphate,caramel,xanthan_gum,barley,eggs,baking_soda,vitamin_a,annatto,caramel_color,yellow_5,high_fructose_corn_syrup,skim_milk,cellulose,cheddar_cheese,chocolate,apples,flavoring,rice_flour,soy_protein,juice_concentrate,guar_gum,potassium_sorbate,turmeric,vitamin_a_palmitate,gluten,peanuts,molasses,safflowers,coconut,modified_food_starch,vanilla,blue_1,honey,lemons,magnesium,safflower_oil,zinc,vitamin_d,buttermilk,seasoning,cocoa_butter,parsley,sodium_citrate,carrots,gelatin,glycerin,tocopherols,barley_flour,calcium_carbonate,chicken,leavening,malic_acid,wheat_gluten,artificial_colors,tapioca,brown_rice,puree,carrageenan,casein,brown_sugar,cane_sugar,cinnamon,palm_kernel_oil,vitamin_b12,alkali,beef,almonds,bht,black_pepper,pyrophosphate,whey_protein_concentrate,coconut_oil,olives,sucralose,tomato_paste,bell_peppers,bran,carotenes,cornmeal,lactose,potato_starch,rum,silicon,vitamin_e,celery,dates,fruit,ginger,olive_oil,biotin,sesame,tomatoes,alum,calcium_sulfate,evaporated_cane_juice,lemon_juice,must,berries,mustard,oranges,sulfites,torula,cellulose_gum,egg_whites,semolina,wheat_starch,aluminum,beta_carotene,durum,copper,grapes,pork,sesame_seeds,apple_juice,milk_proteins,paprika_extract,pectin,sour_cream,soy_sauce,tapioca_starch,beets,chili_peppers,oleoresin,raisins,titanium,barley_malt,bha,carnauba_wax,jalapeno_peppers,peanut_oil,shortening,sorbitol,tbhq,aspartame,choline,edta,green_tea,manganese,parmesan_cheese,pears,rosemary,sodium_ascorbate,vitamin_b6,calcium_chloride,chocolate_liquor,coffee,egg_yolks,gum_arabic,lime,natamycin,sodium_aluminum_phosphate,tricalcium_phosphate,basil,eel,ham,propylene_glycol,rice_syrup,rolled_oats,vitamin_c,wine,baking_powder,datem,mint,mozzarella_cheese,pineapples,rye,bleached_flour,choline_chloride,dicalcium_phosphate,fumaric_acid,grape_juice,locust_bean_gum,oat_flour,oregano,phosphoric_acid,spinach,whey_protein_isolate,acacia,blue_2,cashews,chicken_fat,chocolate_chips,glucose,herbs,mushrooms,oat_fiber,rice_bran,romano_cheese,vanillin,acetic_acid,black_tea,blue_cheese,chicory,cholecalciferol,chromium,cloves,cumin,fish,mustard_seed,peanut_butter,peppermint,sodium_alginate,sodium_selenite,sunflower_seeds,tamari,taurine,vegetable_shortening,calcium_caseinate,chicken_broth,cider,cranberries,fruit_juice,licorice,malt_extract,maltitol,stevia,turkey,wheat_bran,zinc_sulfate,alcohol,calcium_lactate,copper_sulfate,coriander,cysteine,flax_seeds,hops,inositol,invert_sugar,oat_bran,orange_peel,pasta,pecans,rice_starch,stearic_acid,tomato_juice,vinegar_powder,vitamin_k,walnuts,apple_cider,apple_cider_vinegar,bananas,beeswax,broccoli,calcium_iodate,cayenne_pepper,copper_gluconate,glutamine,lime_juice,menadione,methionine,millet,nutmeg,pineapple_juice,pumpkin,sage,sesame_oil,tamarind,thyme,triglyceride,unsweetened_chocolate,vegetable_juice,vitamin_a_acetate,wheat_germ,wheat_protein,ammonium_bicarbonate,bacon,blueberries,caffeine,celery_seed,cobalt,dill,ginseng,macaroni,mannitol,margarine,monterey_jack_cheese,orange_juice,peanut_flour,quinoa,rye_flour,strawberries,sucrose,tapioca_syrup,vanilla_beans,acesulfame_k,agar,alfalfa,beet_juice,buckwheat,cabbage,cardamom,carnitine,chamomile,cherries,chili_powder,cream_cheese,crisp_rice,durum_flour,durum_semolina,emulsifiers,fennel,ferrous_fumarate,ginger_root,gluten_meal,green_beans,liver,lysine,natural_colors,noodles,pepperoni,peptides,pumpkin_seeds,selenium,sulfur,tartaric_acid,tuna,white_pepper,white_vinegar,wine_vinegar,xylitol,yogurt,ammonium_sulfate,amylase,anise,apricots,balsamic_vinegar,beef_stock,bread_crumbs,butter_oil,chicken_stock,chipotle,choline_bitartrate,corn_gluten_meal,cucumbers,fish_meal,fish_oil,gold,hazelnuts,hibiscus,hickory_smoke_flavor,hydrolyzed_corn_gluten,kelp,lemon_oil,lentil,malt_syrup,maple_syrup,papaya,peaches,pomegranate,pulp,radish,rennet,rice_bran_oil,salmon,shrimp,sodium_lactate,soybean_meal,spearmint,sweet_potatoes,whey_peptides,adipic_acid,albumen,allspice,amaranth,american_cheese,anchovies,apocarotenal,artichokes,beet_powder,black_beans,ground_beef,lettuce
Food court order: """{{order}}"""
Using only ingredients from the list above, output what is needed to satisfy the order. Include quantities. Do not include steps for the recipe, but output a JSON object of required ingredients \`required\` (name: quantity) and optional ones \`optional\` (name: quantity). Each ingredient must have an exact quantity (few n doesn't work)! MOST IMPORTANT: SEPARATE QUANTITY FROM UNITS WITH UNDERSCORE!!!\
`

const SYSTEM_PROMPT = `\
You are Kosmo, an AI agent/chatbot for the service SpaceBurger. SpaceBurger allows users on planets, moons, space stations, and other extraterrestrial bodies to order food that satisfies their needs while accommodating for limited supply of ingredients. Your job is to take users' orders, so you reply in a concise and helpful manner.
Also, you must try your best to get users' names in a subtle manner, because names are required for placing an order. Try to make the conversation more personalized by using the name.
`

const USER_PROMPT = `\
User message: """
{{message}}
"""
You are taking this user's order. You will continue to ask clarifying follow-up questions about OPTIONAL INGREDIENTS ONLY (ex don't ask "Do you want bacon in your BLT?") until you and this user have arrived at a final order. An order is final after no part of it is ambiguous and the user has confirmed it to be so. An order may not have special instructions (ex deep fried) or branded items (ex Sprite). Drink requests cannot be fulfilled (ex water, wine, Fanta). Clearly impractical requests (such as dyed cheese) are also invalid. Any invalid request/order must be politely declined and helpfully explained. Always offer an alternative where applicable. Don't ask too many questions in each turn (2 max normally).
You will output a JSON object in one of two formats:
1- You need to ask the user a question about their order or you need to prompt them to confirm: {reply: string}.
2- You are submitting the final order and closing the thread: {order: string, name: string}. The order field must contain all required details, don't miss anything! Name is the name of the person you are speaking to. Therefore, you cannot order until you get their name.
Examples
User: Can I actually get pork instead of beef? And a Sprite would be nice too.
Assistant: {reply: "Sure! The beef can be substituted with pork. Unfortunately, we do not provide Sprite. Is there anything else I can get for you or is that all?"}
User: Nothing else, you can confirm.
Assistant: {order: "1 grilled spicy pork taco with vegetables, a side of beans, and ketchup"} // User asked for these in previous messages\
`

const USER_FAIL_PROMPT = `\
[SYSTEM] the order failed because the ingredients {{missing}} are out of stock temporarily. Please output a message that explains the outage to the user in an apologetic tone and offers an alternative that is as close to the order as possible. Make sure the explanation includes the key items that are missing. Make sure the alternative doesn't require the ingredients the missing ingredients.
Output your response as a JSON object {reply: string}\
`

const SUCCESS_PROMPT = `\
Thanks, your order has been placed!
Order: {{order}}
You are #{{number}} in line, so please be sure to pick up your food by {{time}}! Have a great day!
`

const GREETING = `\
Hey, I'm Kosmo, and I'll help you order today! What's your name?
`

export async function sendChatMessage(message: string, sessionId: string): Promise<{reply: string, name: string}> {
    const response: QueryResponse<AnyItem & MessageType> = await MessageModel.query("session_id").eq(sessionId).sort("ascending").limit(25).exec();
    const jsonResponse = response.toJSON();
    const messages = jsonResponse.map(message => ({role: message.role, content: message.content}));

    const userMessageModel = new MessageModel({session_id: sessionId, id: jsonResponse[jsonResponse.length - 1].id + 1, role: "user", content: message, timestamp: Date.now()});

    const chatMessages = [{role: "system", content: SYSTEM_PROMPT}, ...messages, {role: "user", content: USER_PROMPT.replaceAll("{{message}}", message)}];

    const completion = await client.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: chatMessages,
        response_format: {type: "json_object"}
    });

    const parsed = JSON.parse(completion.choices[0].message.content!);
    if (parsed.order) {
        console.log("Processing order: " + parsed.order);
        const orderResult = await handleOrder(parsed.order);
        // @ts-ignore
        if (orderResult.missing) {
            // @ts-ignore
            console.log("Handling missing: " + orderResult.missing);
            // @ts-ignore
            parsed.reply = await handleMissing(orderResult.missing, parsed.order, chatMessages);
        } else {
            return {reply: await completeOrder(parsed.order, response), name: parsed.name};
        }
    }

    await userMessageModel.save();

    const assistantMessageModel = new MessageModel({session_id: sessionId, id: jsonResponse[jsonResponse.length - 1].id + 2, role: "assistant", content: parsed.reply, timestamp: Date.now()});
    void assistantMessageModel.save();

    return {reply: parsed.reply, name: parsed.name || ""};
}

async function completeOrder(order: string, databaseMessages: QueryResponse<AnyItem & MessageType>): Promise<string> {
    console.log("Completing order: " + order);

    await MessageModel.batchDelete(databaseMessages);

    return SUCCESS_PROMPT.replaceAll("{{order}}", order).replaceAll("{{number}}", String(Math.floor(Math.random() * 1000))).replaceAll("{{time}}", getNextHour());
}

async function handleMissing(missing: string[], order: string, messages: {role: "user" | "assistant" | "system", content: string}[]): Promise<string> {
    const completion = await client.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: [...messages, {role: "assistant", content: JSON.stringify({order})}, {role: "user", content: USER_FAIL_PROMPT.replaceAll("{{missing}}", JSON.stringify(missing))}],
        response_format: {type: "json_object"}
    });

    return JSON.parse(completion.choices[0].message.content!).reply; // i rlly hope it works most of the time
}

// todo: replace `mem` with DynamoDB
async function handleOrder(order: string): Promise<{success: true} | {missing: string[]}> {
    const completion = await client.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: [{role: "user", content: RECIPE_PROMPT.replaceAll("{{order}}", order)}],
        response_format: {type: "json_object"}
    })
    console.log(completion.choices[0].message.content);

    const parsed: {required: {[key: string]: string}, optional: {[key: string]: string}} = JSON.parse(completion.choices[0].message.content!);
    console.log("Parsed: " + parsed);
    
    const invalidKeys = Object.keys(parsed.required).filter(key => !(key in mem));
    if (invalidKeys.length) {
        console.log("[WARN] INVALID KEYS DETECTED!"); // todo: handle it in a better way, but like, how?
        console.log("Got: " + invalidKeys);
    }
    
    const validKeys = Object.keys(parsed.required).filter(key => key in mem);
    console.log("Got: " + validKeys);

    const missing: string[] = [];

    const BRUH = await IngredientModel.batchGet(validKeys.map(vk => ({ingredient: vk})));
    const models = Object.fromEntries(BRUH.map(x => ([x.ingredient, x])));
    const quantities: {[key: string]: number} = Object.fromEntries(BRUH.toJSON().map(x => ([x.ingredient, x.quantity])));
    console.log("Got q: " + quantities);
    for (const key of validKeys) {
        const needed = handleFraction(parsed.required[key].split("_")[0]); // todo: handle units (like actually convert them)
        if (quantities[key] < needed) {
            missing.push(key);
        }
    }

    if (missing.length) {
        console.log(missing);
        return {missing};
    }

    for (const key of validKeys) {
        const needed = handleFraction(parsed.required[key].split("_")[0]);
        console.log("Taking away " + needed + " " + key);
        // @ts-ignore
        models[key].quantity = quantities[key] - needed;
        void models[key].save();
        //mem[key] = mem[key] - needed;
    }

    console.log("Success?? ;-;");
    //console.log(mem);

    return {success: true};
}

function getNextHour() { // todo: test
    const date = new Date();
    date.setHours(date.getHours() + 1);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const mins = minutes < 10 ? '0' + minutes : String(minutes);
    return hours + ':' + mins + ' ' + ampm;
}

// From my testing this function seems to work
function handleFraction(input: string): number { // todo: is this function for real?? lmao
    if (input.includes("/")) {
        const split = input.split("/");
        return Number.parseFloat(split[0]) / Number.parseFloat(split[1]);
    }
    return Number.parseFloat(input);
}

export async function getMessages(sessionId: string): Promise<string> {
    const response = await MessageModel.query("session_id").eq(sessionId).sort("ascending").limit(25).exec();
    if (response.count === 0) {
        const model = new MessageModel({role: "assistant", content: GREETING, timestamp: Date.now(), id: 0, session_id: sessionId});
        void model.save();
        return JSON.stringify([{role: "assistant", content: GREETING, timestamp: Date.now()}]);
    }
    return JSON.stringify(response.toJSON() as Message[]);
}

const mem = {"salt":11,"corn":11,"sugar":11,"natural_flavor":11,"soy":11,"water":11,"sodium":11,"flour":11,"milk":11,"beans":11,"citric_acid":11,"starch":11,"wheat":11,"malt":11,"garlic":11,"vegetables":11,"phosphate":11,"calcium":11,"onions":11,"spices":11,"wheat_flour":11,"soybean_oil":11,"sunflowers":11,"niacin":11,"canola_oil":11,"lecithin":11,"thiamin":11,"dextrin":11,"riboflavin":11,"yeast":11,"corn_syrup":11,"folic_acid":11,"cultures":11,"maltodextrin":11,"sunflower_oil":11,"roses":11,"artificial_flavors":11,"noni":11,"whey":11,"organic":11,"soy_lecithin":11,"enzymes":11,"vegetable_oil":11,"potassium":11,"dextrose":11,"butter":11,"rice":11,"cheese":11,"iron":11,"nuts":11,"potatoes":11,"protein":11,"sea_salt":11,"corn_starch":11,"tin":11,"oats":11,"paprika":11,"corn_oil":11,"vinegar":11,"fructose":11,"chloride":11,"carbon":11,"glyceride":11,"cheese_cultures":11,"cottonseed_oil":11,"cream":11,"calcium_phosphate":11,"peas":11,"hydrogen":11,"monoglycerides":11,"yeast_extract":11,"cocoa":11,"reduced_iron":11,"lactic_acid":11,"palm_oil":11,"sodium_phosphate":11,"caramel":11,"xanthan_gum":11,"barley":11,"eggs":11,"baking_soda":11,"vitamin_a":11,"annatto":11,"caramel_color":11,"yellow_5":11,"high_fructose_corn_syrup":11,"diglycerides":11,"red_4":11,"red_40":11,"skim_milk":11,"cellulose":11,"cheddar_cheese":11,"monosodium_glutamate":11,"yellow_6":11,"chocolate":11,"hydrochloride":11,"apples":11,"flavoring":11,"rice_flour":11,"soy_protein":11,"juice_concentrate":11,"guar_gum":11,"potassium_sorbate":11,"turmeric":11,"vitamin_a_palmitate":11,"gluten":11,"peanuts":11,"molasses":11,"safflowers":11,"coconut":11,"modified_food_starch":11,"vanilla":11,"blue_1":11,"honey":11,"lemons":11,"magnesium":11,"safflower_oil":11,"zinc":11,"vitamin_d":11,"buttermilk":11,"seasoning":11,"cocoa_butter":11,"parsley":11,"sodium_citrate":11,"carrots":11,"gelatin":11,"glycerin":11,"tocopherols":11,"barley_flour":11,"calcium_carbonate":11,"chicken":11,"leavening":11,"malic_acid":11,"wheat_gluten":11,"artificial_colors":11,"tapioca":11,"brown_rice":11,"puree":11,"carrageenan":11,"casein":11,"brown_sugar":11,"cane_sugar":11,"cinnamon":11,"palm_kernel_oil":11,"vitamin_b12":11,"alkali":11,"beef":11,"almonds":11,"bht":11,"black_pepper":11,"pyrophosphate":11,"whey_protein_concentrate":11,"coconut_oil":11,"disodium_inosinate":11,"olives":11,"potassium_chloride":11,"sorbic_acid":11,"sucralose":11,"tomato_paste":11,"bell_peppers":11,"bran":11,"disodium_guanylate":11,"monocalcium_phosphate":11,"carotenes":11,"cornmeal":11,"lactose":11,"potato_starch":11,"rum":11,"silicon":11,"vitamin_e":11,"calcium_pantothenate":11,"celery":11,"dates":11,"fruit":11,"silicon_dioxide":11,"ginger":11,"olive_oil":11,"biotin":11,"sesame":11,"calcium_propionate":11,"disodium_phosphate":11,"tomatoes":11,"alum":11,"calcium_sulfate":11,"evaporated_cane_juice":11,"lemon_juice":11,"must":11,"zinc_oxide":11,"berries":11,"mustard":11,"oranges":11,"sodium_benzoate":11,"sodium_nitrite":11,"sulfites":11,"torula":11,"cellulose_gum":11,"egg_whites":11,"semolina":11,"wheat_starch":11,"aluminum":11,"beta_carotene":11,"durum":11,"copper":11,"grapes":11,"pork":11,"potassium_phosphate":11,"sesame_seeds":11,"sodium_stearoyl_lactylate":11,"apple_juice":11,"hydrolyzed_soy_protein":11,"magnesium_stearate":11,"milk_proteins":11,"paprika_extract":11,"pectin":11,"sour_cream":11,"soy_sauce":11,"tapioca_starch":11,"beets":11,"chili_peppers":11,"cyanocobalamin":11,"oleoresin":11,"raisins":11,"titanium":11,"barley_malt":11,"bha":11,"carnauba_wax":11,"jalapeno_peppers":11,"peanut_oil":11,"polysorbates":11,"shortening":11,"sorbitol":11,"tbhq":11,"titanium_dioxide":11,"aspartame":11,"choline":11,"edta":11,"green_tea":11,"manganese":11,"parmesan_cheese":11,"pears":11,"rosemary":11,"sodium_ascorbate":11,"vitamin_b6":11,"calcium_chloride":11,"chocolate_liquor":11,"coffee":11,"egg_yolks":11,"gum_arabic":11,"lime":11,"natamycin":11,"sodium_aluminum_phosphate":11,"tricalcium_phosphate":11,"basil":11,"eel":11,"ham":11,"magnesium_oxide":11,"propylene_glycol":11,"rice_syrup":11,"rolled_oats":11,"vitamin_c":11,"wine":11,"baking_powder":11,"datem":11,"mint":11,"mozzarella_cheese":11,"pineapples":11,"potassium_citrate":11,"rye":11,"sodium_erythorbate":11,"bleached_flour":11,"choline_chloride":11,"dicalcium_phosphate":11,"fumaric_acid":11,"grape_juice":11,"locust_bean_gum":11,"oat_flour":11,"oregano":11,"phosphoric_acid":11,"potassium_iodide":11,"sodium_bisulfite":11,"spinach":11,"whey_protein_isolate":11,"acacia":11,"blue_2":11,"cashews":11,"chicken_fat":11,"chocolate_chips":11,"glucose":11,"herbs":11,"mushrooms":11,"oat_fiber":11,"rice_bran":11,"romano_cheese":11,"vanillin":11,"acetic_acid":11,"black_tea":11,"blue_cheese":11,"chicory":11,"cholecalciferol":11,"chromium":11,"cloves":11,"cumin":11,"fish":11,"mustard_seed":11,"peanut_butter":11,"peppermint":11,"sodium_alginate":11,"sodium_selenite":11,"sunflower_seeds":11,"tamari":11,"taurine":11,"vegetable_shortening":11,"calcium_caseinate":11,"chicken_broth":11,"cider":11,"cranberries":11,"fruit_juice":11,"licorice":11,"malt_extract":11,"maltitol":11,"manganese_sulfate":11,"powdered_cellulose":11,"stevia":11,"tocopheryl_acetate":11,"turkey":11,"wheat_bran":11,"zinc_sulfate":11,"alcohol":11,"calcium_lactate":11,"copper_sulfate":11,"coriander":11,"cysteine":11,"flax_seeds":11,"hops":11,"inositol":11,"invert_sugar":11,"oat_bran":11,"orange_peel":11,"pasta":11,"pecans":11,"red_3":11,"rice_starch":11,"stearic_acid":11,"tomato_juice":11,"vinegar_powder":11,"vitamin_k":11,"walnuts":11,"apple_cider":11,"apple_cider_vinegar":11,"bananas":11,"beeswax":11,"broccoli":11,"calcium_iodate":11,"cayenne_pepper":11,"copper_gluconate":11,"glutamine":11,"lime_juice":11,"menadione":11,"methionine":11,"methylcellulose":11,"millet":11,"nutmeg":11,"pineapple_juice":11,"pumpkin":11,"sage":11,"sesame_oil":11,"sorbitan":11,"sorbitan_monostearate":11,"tamarind":11,"thyme":11,"triglyceride":11,"unsweetened_chocolate":11,"vegetable_juice":11,"vitamin_a_acetate":11,"wheat_germ":11,"wheat_protein":11,"ammonium_bicarbonate":11,"bacon":11,"blueberries":11,"caffeine":11,"calcium_silicate":11,"calcium_stearate":11,"celery_seed":11,"cobalt":11,"dill":11,"ginseng":11,"macaroni":11,"manganous_oxide":11,"mannitol":11,"margarine":11,"monterey_jack_cheese":11,"orange_juice":11,"peanut_flour":11,"polydextrose":11,"quinoa":11,"rye_flour":11,"sodium_metabisulfite":11,"sodium_propionate":11,"strawberries":11,"sucrose":11,"tapioca_syrup":11,"vanilla_beans":11,"acesulfame_k":11,"agar":11,"alfalfa":11,"amino_acids":11,"azodicarbonamide":11,"beet_juice":11,"buckwheat":11,"cabbage":11,"cardamom":11,"carnitine":11,"chamomile":11,"cherries":11,"chili_powder":11,"cream_cheese":11,"crisp_rice":11,"durum_flour":11,"durum_semolina":11,"emulsifiers":11,"fennel":11,"ferrous_fumarate":11,"ginger_root":11,"gluten_meal":11,"green_beans":11,"liver":11,"lysine":11,"natural_colors":11,"noodles":11,"pepperoni":11,"peptides":11,"potassium_lactate":11,"pumpkin_seeds":11,"selenium":11,"sodium_hexametaphosphate":11,"sodium_pyrophosphate":11,"sodium_tripolyphosphate":11,"sulfur":11,"tartaric_acid":11,"tuna":11,"white_pepper":11,"white_vinegar":11,"wine_vinegar":11,"xylitol":11,"yogurt":11,"amino_acid_chelate":11,"ammonium_sulfate":11,"amylase":11,"anise":11,"apricots":11,"balsamic_vinegar":11,"beef_stock":11,"bread_crumbs":11,"butter_oil":11,"chicken_stock":11,"chipotle":11,"choline_bitartrate":11,"corn_gluten_meal":11,"cucumbers":11,"fish_meal":11,"fish_oil":11,"gold":11,"hazelnuts":11,"hibiscus":11,"hickory_smoke_flavor":11,"hydrolyzed_corn_gluten":11,"kelp":11,"lemon_oil":11,"lentil":11,"malt_syrup":11,"maple_syrup":11,"microcrystalline_cellulose":11,"papaya":11,"peaches":11,"pomegranate":11,"pulp":11,"radish":11,"rennet":11,"rice_bran_oil":11,"salmon":11,"shrimp":11,"sodium_lactate":11,"soybean_meal":11,"spearmint":11,"sweet_potatoes":11,"tapioca_dextrin":11,"whey_peptides":11,"adipic_acid":11,"albumen":11,"allspice":11,"aluminum_sulfate":11,"amaranth":11,"american_cheese":11,"anchovies":11,"apocarotenal":11,"artichokes":11,"b_vitamins":11,"beet_powder":11,"black_beans":11,"bromelain":11, "ground_beef": 11, "lettuce": 11};
