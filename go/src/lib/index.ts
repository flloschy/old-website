// import fs from "fs";
// 
// // https://stackoverflow.com/questions/64383909/dirname-is-not-defined-error-in-node-14-version //
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// 
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// //
// 
// 
interface Links {
    [key: string]: string;
}

export let links:Links;
// 
// try {
//     links = JSON.parse(fs.readFileSync("/links.json", "utf-8"));
// } catch (e) {
//     links = {};
//     fs.writeFileSync("/links.json", "{}", { flag: "wx" })
// }
// 
// function update() {
//     const str = JSON.stringify(links)
//     fs.writeFileSync("/links.json", str)
// }
// 
// export function addLink(short:string, url:string) {
//     links[short] = url;
//     update();
// }
// export function remLink(short:string) {
//     delete links[short]
//     update();
// }

links = {
    'github': 'https://github.com/flloschy',
    'discord': 'https://discord.com/users/578620425060483072',
}