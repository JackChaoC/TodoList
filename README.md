1.设计表

2.用express和mysqljs完成接口（增删改查4个功能）

3.前端用elementUI的表格展示视图，有搜索和排序功能(数据库端完成)

4.部署

表

issue_lists

```sql
CREATE TABLE `issue_lists` (
  `id` INT AUTO_INCREMENT PRIMARY KEY, -- 自增的主键ID
  `content` TEXT NOT NULL,             -- 任务内容，文本格式
  `order_date` DATETIME NOT NULL,      -- 任务创建时间，格式为 'YYYY-MM-DD HH:MM:SS'
  `state` INT NOT NULL                 -- 任务状态，整数格式
);
```

users

```sql
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY, -- 自增的主键ID
  `username` VARCHAR(255) NOT NULL,    -- 用户名，字符串格式
  `password` VARCHAR(255) NOT NULL     -- 密码，字符串格式
);

```

