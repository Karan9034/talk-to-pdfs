import { NextRequest, NextResponse } from "next/server";
import { PineconeClient } from "@pinecone-database/pinecone";

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}  

export async function DELETE(request: NextRequest) {
    const pineconeClient = new PineconeClient();
    await pineconeClient.init({
        apiKey: process.env.PINECONE_APIKEY ?? "",
        environment: "gcp-starter",
    });
    await pineconeClient.deleteIndex({
        indexName: process.env.PINECONE_INDEX_NAME as string,
    });
    await sleep(10000);
    await pineconeClient.createIndex({
        createRequest: {
            dimension: 1536,
            name: process.env.PINECONE_INDEX_NAME as string,
            metric: "cosine",
        },
    })
    return NextResponse.json({ success: true });
}