from fastapi import FastAPI
from pydantic import BaseModel
from chains.categorize_chain import categorize_task
from chains.subtask_chain import suggest_subtasks
from chat.assistant_chat import assistant_chat
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

class TaskInput(BaseModel):
    task: str

class ChatInput(BaseModel):
    message: str

@app.post("/categorize")
def categorize(input: TaskInput):
    category = categorize_task(input.task)
    return {"category": category}

@app.post("/subtasks")
def generate_subtasks(input: TaskInput):
    subtasks = suggest_subtasks(input.task)
    return {"subtasks": subtasks}

@app.post("/chat")
def chat_with_assistant(input: ChatInput):
    reply = assistant_chat(input.message)
    return {"reply": reply}
