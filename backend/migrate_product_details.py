import sqlite3


conn = sqlite3.connect("pharmacy.db")
cursor = conn.cursor()


def add_column(sql, name):
    try:
        cursor.execute(sql)
        print(f"{name} added")
    except sqlite3.OperationalError as error:
        print(f"{name}: {error}")


add_column(
    "ALTER TABLE products ADD COLUMN brand VARCHAR",
    "brand",
)

add_column(
    "ALTER TABLE products ADD COLUMN description TEXT",
    "description",
)

add_column(
    "ALTER TABLE products ADD COLUMN stock INTEGER NOT NULL DEFAULT 0",
    "stock",
)

conn.commit()
conn.close()

print("product details migration finished")
