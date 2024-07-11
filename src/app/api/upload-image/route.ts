// app/api/upload
import { connectToDb } from "@/app/libs/gridFs";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { Readable } from "stream";

export async function POST(req: Request) {
  const { bucket } = await connectToDb();
  // get the form data
  const data = await req.formData();

  // Assuming there's only one file in the form data
  const fileEntry = data.get("file");
  if (!fileEntry) {
    return NextResponse.json({ success: false, message: "No file provided" });
  }

  // Check if the entry is a Blob (file)
  const filename = randomUUID();
  if (fileEntry instanceof Blob) {
    const blob = fileEntry;

    // Convert the blob to stream
    const buffer = Buffer.from(await blob.arrayBuffer());
    const stream = Readable.from(buffer);

    const uploadStream = bucket.openUploadStream(filename, {
      // Make sure to add content type so that it will be easier to set later.
      contentType: blob.type,
      metadata: {}, // Add your metadata here if any
    });

    // Pipe the readable stream to a writeable stream to save it to the database
    await stream.pipe(uploadStream);
  } else {
    return NextResponse.json({ success: false, message: "Invalid file entry" });
  }

  // Return the response after the file has been processed.
  return NextResponse.json({ success: true, name: filename });
}
