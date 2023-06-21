import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [profession, setProfession] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(true);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const addMessage = async (event) => {
    event.preventDefault();

    if (!newMessage.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { user: "You", text: newMessage },
    ]);

    setMessageLoading(true);

    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: newMessage,
        character: { name, ethnicity, gender, age, profession },
      }),
    });

    const data = await response.json();

    setMessageLoading(false);

    setMessages((prevMessages) => [
      ...prevMessages,
      { user: name, text: data.message },
    ]);

    setNewMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const prompt = `a minimalist animated portrait of a person who is ${ethnicity}, ${age} years old ${gender} and is a ${profession} by profession. 4k, portrait, 3D, minimalist, character.`;

    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      setIsLoading(false);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        setIsLoading(false);
        return;
      }
      setPrediction(prediction);
    }

    setIsLoading(false);
    setEdit(false);
  };

  return (
    <div className="">
      <Head>
        <title>ttya</title>
        <style>
          {`body {
              background-color: black;
            }`}
        </style>
      </Head>
      <header>
        <div className="flex justify-start">
          <div className="flex p-4">
            <span className="p-2 font-semibold text-3xl rounded-md hover:bg-white/10 px-3 text-gray-300">
              ttya
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-col justify-center items-center p-8">
        {prediction && prediction.status == "succeeded" && (
          <div className="flex justify-between gap-10 flex-row">
            <div className="flex flex-col p-4 items-center">
              <div className="border border-dashed rounded-md flex p-4 justify-center border-white/25">
                {prediction.output && (
                  <div className="relative h-[350px] w-[350px] justify-center flex">
                    <Image
                      src={prediction.output[prediction.output.length - 1]}
                      alt="output"
                      layout="fill"
                      objectFit="contain"
                      className="absolute rounded-md"
                    />
                  </div>
                )}
              </div>
              <span className="text-gray-300 text-center p-2 font-syne font-bold text-2xl">
                Hi, I&apos;m {name}
              </span>
              {!edit && (
                <button
                  onClick={() => setEdit(true)}
                  className="ring-1 text-gray-200 ring-gray-400 p-2 rounded-md hover:bg-white/10 mt-3"
                >
                  Edit
                </button>
              )}
            </div>
            <div className="flex justify-center max-w-lg flex-col h-full p-4">
              <span className="text-white text-center pb-3 text-l font-syne">
                Send a message and start chatting with {name}
              </span>
              <div
                id="chatbox"
                className={`flex flex-col gap-2 p-4 overflow-auto mb-4 flex-grow max-h-96 ${
                  messages.length > 0
                    ? "bg-gray-900/30 rounded-lg  ring-1 ring-gray-500 shadow-lg"
                    : ""
                }`}
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.user === name ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`rounded-md p-2 ${
                        message.user === name
                          ? "bg-green-300 text-start"
                          : "bg-blue-300"
                      }`}
                    >
                      <strong>{message.user}:</strong> {message.text}
                    </div>
                  </div>
                ))}
                {messageLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-md p-2 bg-green-300">
                      <strong>{name}</strong> Thinking...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <form onSubmit={addMessage} className="flex">
                <input
                  type="text"
                  className="flex-grow ring-1 bg-white/10 focus:outline-none text-gray-300 ring-gray-500 mr-2 py-2 px-4 rounded-md"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}

        {edit && (
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 text-gray-300 font-space flex-col"
          >
            <label>Name your character</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Lewis"
              className="bg-white/20 p-1 px-2 rounded-md focus:outline-none ring-1 ring-gray-500 mt-1 mb-3"
            />
            <label>What&apos; the ethnicity of your character? </label>
            <input
              required
              value={ethnicity}
              onChange={(e) => setEthnicity(e.target.value)}
              placeholder="British"
              className="bg-white/20 p-1 px-2 rounded-md focus:outline-none ring-1 ring-gray-500 mt-1 mb-3"
            />
            <label>Gender / Sex </label>
            <input
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Male"
              className="bg-white/20 p-1 px-2 rounded-md focus:outline-none ring-1 ring-gray-500 mt-1 mb-3"
            />
            <label>How old is your character? (Age)</label>
            <input
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="38"
              className="bg-white/20 p-1 px-2 rounded-md focus:outline-none ring-1 ring-gray-500 mt-1 mb-3"
            />
            <label>What does your character do for living ? (profession)</label>
            <input
              required
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="F1 Race Driver"
              className="bg-white/20 p-1 px-2 rounded-md focus:outline-none ring-1 ring-gray-500 mt-1 mb-3"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="ring-1 ring-gray-400 p-2 rounded-md hover:bg-white/10"
              >
                {isLoading ? (
                  <span className="loader"></span>
                ) : (
                  <span>Generate</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
