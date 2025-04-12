from langchain_openai import ChatOpenAI
from langchain.chains import ConversationChain
from memory.memory_store import memory
from dotenv import load_dotenv

load_dotenv()
import os

llm = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"), temperature=0.7)

conversation = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=False
)

def assistant_chat(user_input: str):
    return conversation.predict(input=user_input)
