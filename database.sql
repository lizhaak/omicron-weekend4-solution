CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  task_content varchar(255) NOT NULL,
  created_date TIMESTAMP DEFAULT NOW(),
  completed_date TIMESTAMP DEFAULT NULL
 );
  
