import React from "react";
import { useState } from "react";
import { Navbar, Card, Button } from "flowbite-react";
import axios from "axios";

const AudioUploader = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTranscription(response.data);
    } catch (err) {
      console.error(`Error uploading audio file : ${err}`);
    }
  };
  return (
    <>
      <Navbar className="bg-rose-300" fluid rounded>
        <span className="self-center flex items-center justify-center text-center text-xl font-semibold dark:text-red-400 w-full">
          Audio Transcriber
        </span>
      </Navbar>
      <div className="flex justify-center items-center min-h-screen">
        <Card className="max-w-lg w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Audio to Text Transcriber
          </h5>

          {/* Input for audio */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1"
              htmlFor="audio-upload"
            >
              Upload Audio:
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
              id="audio-upload"
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <Button onClick={handleUpload}>Transcribe Audio</Button>
          </div>

          {/* Text section */}
          <textarea
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 mb-4"
            rows="4"
            placeholder="Transcribed text will appear here..."
            value={transcription}
            readOnly
          >
            {transcription}
          </textarea>
        </Card>
      </div>
    </>
  );
};

export default AudioUploader;
