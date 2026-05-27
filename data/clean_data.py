import pandas as pd

INPUT_FILE = "superstore.csv"
OUTPUT_FILE = "cleaned_superstore.csv"

# Load dataset
df = pd.read_csv(INPUT_FILE, encoding="cp1252")

print("Original Shape:", df.shape)

# Standardize column names
df.columns = [
    col.strip().lower().replace(" ", "_").replace("-", "_")
    for col in df.columns
]

# Remove duplicates
df = df.drop_duplicates()

# Remove rows with missing critical values
critical_cols = [
    "order_id",
    "order_date",
    "sales",
    "profit",
    "category",
    "region"
]

existing_critical_cols = [col for col in critical_cols if col in df.columns]

df = df.dropna(subset=existing_critical_cols)

# Convert dates
for col in ["order_date", "ship_date"]:
    if col in df.columns:
        df[col] = pd.to_datetime(df[col], errors="coerce")

# Convert numeric columns
numeric_cols = ["sales", "profit", "quantity", "discount"]

for col in numeric_cols:
    if col in df.columns:
        df[col] = pd.to_numeric(df[col], errors="coerce")

# Fill missing numeric values
df[numeric_cols] = df[numeric_cols].fillna(0)

# Save cleaned dataset
df.to_csv(OUTPUT_FILE, index=False)

print("Cleaned Shape:", df.shape)
print(f"Saved cleaned dataset to {OUTPUT_FILE}")