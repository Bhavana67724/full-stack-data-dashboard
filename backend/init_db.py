import pandas as pd
import sqlite3

# Load cleaned CSV
df = pd.read_csv("../data/cleaned_superstore.csv")

# Connect to SQLite database
conn = sqlite3.connect("dashboard.db")

# Save dataframe as SQL table
df.to_sql("orders", conn, if_exists="replace", index=False)

# Verify insertion
cursor = conn.cursor()

cursor.execute("SELECT COUNT(*) FROM orders")
count = cursor.fetchone()[0]

print(f"Inserted {count} rows into orders table.")

conn.close()