from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import os
from dotenv import load_dotenv

load_dotenv()

llm = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"), temperature=0.5)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a productivity expert. Break down the task into 2–4 smaller subtasks."),
    ("human", "{task}")
])

def suggest_subtasks(task: str):
    chain = prompt | llm
    result = chain.invoke({"task": task})
    return result.content.strip()
