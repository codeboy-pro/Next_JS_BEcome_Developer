 import { ImageResponse } from "next/og";
 export const runtime = "edge";

 export async function GET(request) {
    const {searchParams} = new URL(request.url);
    const title = searchParams.get("title") || "Default Title";
    const description = searchParams.get("description") || "Default Description";

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg, #0f172a, #1e293b)",
                    color: "#f8fafc",
                    padding: "60px",
                    fontFamily: "Inter, Helvetica, sans-serif",
                    justifyContent: "center",
                }}
            >
                <p style={{ fontSize: 28, opacity: 0.8, marginBottom: 12 }}>my-app</p>
                <h1 style={{ fontSize: 72, margin: 0 }}>{title}</h1>
                <p style={{ fontSize: 32, marginTop: 20, maxWidth: "80%" }}>{description}</p>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
 }