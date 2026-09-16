import sqlite3


conn = sqlite3.connect("pharmacy.db")
cursor = conn.cursor()


try:
    cursor.execute(
        "ALTER TABLE products ADD COLUMN category VARCHAR"
    )
    print("category added")
except sqlite3.OperationalError as e:
    print("category:", e)


try:
    cursor.execute(
        "ALTER TABLE products ADD COLUMN subcategory VARCHAR"
    )
    print("subcategory added")
except sqlite3.OperationalError as e:
    print("subcategory:", e)


conn.commit()
conn.close()

print("migration finished")