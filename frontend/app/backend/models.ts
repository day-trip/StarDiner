import * as dynamoose from "dynamoose";
import type {AnyItem} from "dynamoose/dist/Item";

const ddb = new dynamoose.aws.ddb.DynamoDB({
    "credentials": {
        "accessKeyId": "AKIA2RGNYGJKHANBWMFX",
        "secretAccessKey": "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"
    },
    "region": "us-west-2"
});
dynamoose.aws.ddb.set(ddb);

export type MessageType = {
    id: number;
    session_id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: number
}
export const MessageModel = dynamoose.model<MessageType & AnyItem>("SpaceBurgerMessage", {
    session_id: {
        type: String,
        hashKey: true
    },
    id: {
        type: Number,
        rangeKey: true
    },
    role: String,
    content: String,
    timestamp: Number
});

export type IngredientType = {
    ingredient: string,
    quantity: number,
    unit: string
}

export const IngredientModel = dynamoose.model<IngredientType & AnyItem>("SpaceBurgerIngredient", {
    ingredient: {
        type: String,
        hashKey: true
    },
    quantity: Number,
    unit: String
});
