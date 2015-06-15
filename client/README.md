# Admin Console Client

## Nginx config

    server {
         listen         80;
         server_name    localhost;
         access_log     /var/log/nginx/host.access.log;
         #root /home/vkastyniuk/admiral-webapp;
         root           /home/vkastyniuk/admin_console/client;

         location / {
            try_files      $uri $uri/ /index.html =404;
         }

         location /api {
            proxy_pass              http://localhost:3000/api;
         }
    }
