DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    movie_title VARCHAR(200) ,
    image_url VARCHAR(200) , 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)


    --  favorites BOOLEAN DEFAULT false,