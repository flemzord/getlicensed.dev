<?php

namespace Deployer;

require 'recipe/laravel.php';
require 'recipe/deploy/writable.php';

set('repository', 'git@github.com:flemzord/getlicensed.dev.git');
//set('dotenv', '{{current_path}}/.env');
set('http_user', 'www-data');
set('http_group', 'www-data');
//set('become', 'www-data');
set('writable_recursive', true);
set('sub_directory', 'apps/app');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

task('deploy:npm', function () {
    cd('{{release_path}}');
    run('npm install');
    run('npm run build');
});

task('deploy:chown', function () {
    cd('{{release_path}}');
    run('chown -R www-data:www-data .');
});

// Hosts
host('157.90.147.230')
    ->set('remote_user', 'root')
    ->set('deploy_path', '/var/www/app.getlicensed.dev');

// Hooks
after('deploy:failed', 'deploy:unlock');
after('deploy:vendors', 'deploy:npm');
after('artisan:migrate', 'deploy:chown');
