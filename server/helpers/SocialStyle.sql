CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name varchar(20) NOT NULL,
  lastname varchar(20) NOT NULL,
  username varchar(50) UNIQUE NOT NULL,
  email varchar(50) UNIQUE NOT NULL,
  password varchar(200) UNIQUE NOT NULL,
  location varchar(20) NOT NULL,
  date_of_birth varchar(50) UNIQUE NOT NULL,
  avatar varchar,
  date timestamp NOT NULL
);

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  comment varchar(200),
  media varchar(200),
  date timestamp,
  user_id INT
);

CREATE TABLE post_likes (
  like_id SERIAL PRIMARY KEY,
  post_id INT,
  user_id INT,
  date timestamp
);

CREATE TABLE post_dislikes (
  dislike_id SERIAL PRIMARY KEY,
  post_id INT,
  user_id INT,
  date timestamp
);

CREATE TABLE post_comments (
  comment_id SERIAL PRIMARY KEY,
  post_id INT,
  user_id INT,
  date timestamp
);

ALTER TABLE posts ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE post_likes ADD FOREIGN KEY (post_id) REFERENCES posts (post_id);

ALTER TABLE post_likes ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE post_dislikes ADD FOREIGN KEY (post_id) REFERENCES posts (post_id);

ALTER TABLE post_dislikes ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE post_comments ADD FOREIGN KEY (post_id) REFERENCES posts (post_id);

ALTER TABLE post_comments ADD FOREIGN KEY (user_id) REFERENCES users (user_id);
