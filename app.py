import streamlit as st
import google.generativeai as genai

# 1. 設定網頁標題
st.title("NZ Journey 測試")
st.write("這是由 Google Gemini 驅動的 AI 網站")

# 2. 接收使用者的輸入
user_input = st.text_input("請在這裡輸入你的問題：", "你好，請自我介紹一下")

# 3. 設定 API 金鑰 (從 Secrets 讀取，確保安全)
# 注意：這裡不需要修改，稍後我們會在網頁後台設定金鑰
if "GEMINI_API_KEY" in st.secrets:
    genai.configure(api_key=st.secrets["GEMINI_API_KEY"])
else:
    st.error("尚未設定 API Key，請在 Streamlit 後台設定。")

# 4. 按鈕邏輯
if st.button("開始生成"):
    if not user_input:
        st.warning("請輸入內容！")
    else:
        try:
            # 建立模型 (這裡使用 gemini-pro，你可以改成你在 AI Studio 用的模型)
            model = genai.GenerativeModel('gemini-pro')
            
            # 顯示讀取中的轉圈圈
            with st.spinner('AI 正在思考中...'):
                response = model.generate_content(user_input)
                
            # 顯示結果
            st.success("生成完成！")
            st.markdown(response.text)
            
        except Exception as e:
            st.error(f"發生錯誤：{e}")
