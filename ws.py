from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from fuzzywuzzy import process
import openai
from webdriver_manager.chrome import ChromeDriverManager

# OpenAI API key (Replace with your own key)
openai.api_key = "your_openai_api_key"

# Set up Selenium WebDriver using WebDriver Manager (No manual download needed)
driver = webdriver.Chrome(ChromeDriverManager().install())

# Open the eLearning website
driver.get("https://elearning.gyaschool.net/my/")
time.sleep(3)

# Login with provided credentials
username = driver.find_element(By.ID, "username")
password = driver.find_element(By.ID, "password")
login_button = driver.find_element(By.ID, "loginbtn")

username.send_keys("201425319")  # Replace with your actual username
password.send_keys("Niko1234")   # Replace with your actual password
login_button.click()
time.sleep(5)

# Navigate to the test page (Replace with actual URL after login)
driver.get("https://elearning.gyaschool.net/test-page-url")
time.sleep(3)

# Dictionary of correct answers (Update with actual questions & answers)
answers = {
    "What was a fundamental cause of Somalia's aggression toward Ethiopia?": "b",
    "Which treaty ended Egypt's aggression in Ethiopia?": "d",
    "The Ethiopian forces were supported by Russia during the Somali aggression.": "a",
}

# Function to find the best answer using fuzzy matching
def find_best_match(question_text):
    best_match, score = process.extractOne(question_text, answers.keys())
    if score > 80:  # Adjust threshold if needed
        return answers[best_match]
    return None  # If no good match is found

# Function to use AI to answer questions
def get_ai_answer(question_text):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": "You are a history expert."},
                  {"role": "user", "content": question_text}]
    )
    return response["choices"][0]["message"]["content"]

# Find all questions and attempt to answer them
div_questions = driver.find_elements(By.CLASS_NAME, "question")
for question_div in div_questions:
    question_text = question_div.text.strip()
    correct_choice = find_best_match(question_text)
    
    if correct_choice is None:
        correct_choice = get_ai_answer(question_text)  # Use AI if no match is found
    
    options = question_div.find_elements(By.TAG_NAME, "input")
    for option in options:
        if option.get_attribute("value").lower() == correct_choice.lower():
            option.click()
            break

# Submit the test (Replace with actual button ID or class if needed)
submit_button = driver.find_element(By.ID, "submitbtn")
submit_button.click()
time.sleep(3)

print("Test submitted successfully!")
driver.quit()
