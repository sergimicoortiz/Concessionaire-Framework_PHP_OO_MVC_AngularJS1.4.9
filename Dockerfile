FROM php:7.4-apache
RUN docker-php-ext-install mysqli && a2enmod rewrite
COPY ./apache_docker.conf /etc/apache2/sites-available/000-default.conf
COPY . /var/www/html/Concessionaire-Framework_PHP_OO_MVC_AngularJS1.4.9
EXPOSE 80