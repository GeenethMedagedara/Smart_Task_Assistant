from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import os
from dotenv import load_dotenv

load_dotenv()

llm = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"), temperature=0)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a task manager. Categorize the task into one of the following: Work, Personal, Urgent, Learning, Health."),
    ("human", "{task}")
])

def categorize_task(task: str):
    chain = prompt | llm
    result = chain.invoke({"task": task})
    return result.content.strip()
