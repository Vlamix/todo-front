let a = 'sosi cmo'

let b = 5

console.log('smotri /\a/ suda \b')

function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
let d = escapeRegExp('dsdfds')

console.log(d)


let g = ['fsdfsd','tdsds','rdsdsf','kdsfsd','bdsds','csdds','addd','hdsds','esdds','dsddssdf']

console.log(g.sort().reverse())

let c = [true, undefined, 0, 3, false, true, 'f', 'sdfsd', 5, null]

console.log(c.sort())

let animal = {
    eats: true,
    o: false
};
let rabbit = {
    jumps: true
};

rabbit.__proto__ = animal;
console.log(rabbit.o)

async function fakeReq(data, time, err) {
    let p = await data
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (err) {
                rej(data)
            }
            res(p)
        }, time)
    })
}


fakeReq('dsfsd', 2000, 'some err').then(res => console.log(res)).catch(reason =>{
    console.log(reason)
})
