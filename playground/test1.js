try {
    throw new Error('出错了!');
} catch (e) {
    console.log(e.name + ": " + e.message);
    console.log(e.stack);
}


console.log('aaaaaaaaaa');