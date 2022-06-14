import sh from 'shelljs';

// // Copy public views and assets to the build folder
sh.cp('-R', 'src/public', 'build/');
sh.cp('-R', 'src/views', 'build/');
