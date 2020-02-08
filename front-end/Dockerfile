# 使用 node 8 作为基础镜像
FROM node:8

# 安装 nginx
RUN apt-get update \
  && apt-get install -y nginx

# 声明运行时容器提供服务端口
EXPOSE 80

# 1. 运行 npm run build
# 2. 将dist 目录的所有文件拷贝到 nginx 的目录下
# 3. 删除工作目录的文件， 尤其是 node_modules 以减少镜像体积
COPY dist/ /var/www/html 

# 启动 nginx
CMD ["nginx","-g","daemon off;"]