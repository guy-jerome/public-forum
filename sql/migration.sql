CREATE TABLE users(
  id BIGSERIAL UNIQUE PRIMARY KEY NOT NULL,
  username varchar(255),
  password_hash varchar(255),
  email varchar(255)
);

CREATE TABLE messages(
  id BIGSERIAL UNIQUE PRIMARY KEY NOT NULL,
  content text,
  time_stamp date,
  user_id int,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);