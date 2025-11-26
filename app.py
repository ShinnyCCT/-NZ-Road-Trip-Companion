import streamlit as st
import google.generativeai as genai

# 從 Streamlit secrets 讀取 API Key
genai.configure(api_key=st.secrets["GEMINI_API_KEY"])

st.title("Gemini 3 Pro 互動式地圖應用")
# 你的地圖和 Gemini 互動程式碼
