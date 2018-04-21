// شكراً لشراءك كود سرعة الكتابة //

// شروط الشراء:
// 1- لديك الأحقية في تعديل الكود
// 2- ليس لديك الحق بإعادة بيع الكود
// 3- ليس لديك الحق بأن تقول إنك قمت بكتابة الكود كاملاً
// الرجاء من قام بشراء الكود بأن يطبق الشروط

// السيرفر الرسمي الخاص بالفريق:
// https://discord.gg/VxatyBC //

// CopyRight: NoName Team.

// يمكنك رؤية التعديلات في هذا الأصدار نهاية السطر //

const Discord = require("discord.js");
const fs = require("fs")
const client = new Discord.Client();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`in ${client.guilds.size} servers `)
    console.log(`[Users] ${client.users.size}`)
	
});
let points = JSON.parse(fs.readFileSync('./typePTS.json', 'utf8')); // يقوم بقراءه ملف النقاط , والمسار حق النقاط
const prefix = "#"; // البرفكس العام لجميع الأوامر

client.on('message', message => {
if (!points[message.author.id]) points[message.author.id] = { // يقوم الكود تلقائياً في حال لم يجد نقاط العضو بإنشاء نقاط له ويتم إرسالها الملف المخصص
	points: 0,
  };
if (message.content.startsWith(prefix + 'سرعة')) { // $سرعة
	if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));

const type = require('./type.json'); // في هذا السطر يقوم الكود بقراءة ملف الأسئلة
const item = type[Math.floor(Math.random() * type.length)]; // الأرراي المخصص للأسئلة
const filter = response => { // في هذا السطر يقوم بصنع فلتر للأجوبة
    return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
message.channel.send('**لديك 15 ثانية لكتابة الكلمة**').then(msg => {
	let embed = new Discord.RichEmbed()
	.setColor('#000000')
	.setFooter("سرعة كتابة | لرؤية مجموع نقاطك اكتب #نقاطي |")
	.setDescription(`**قم بكتابة : ${item.type}**`) // ${item.type} = السؤال
	
	msg.channel.sendEmbed(embed).then(() => {
        message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
        .then((collected) => {
		message.channel.send(`${collected.first().author} ✅ **لقد قمت بكتابة الكلمة بالوقت المناسب**`);
		console.log(`[Typing] ${collected.first().author} typed the word.`);
            let won = collected.first().author; // في هذا السطر يقوم الكود بسحب الأي دي الذي قام بالأجابة اولاً
            points[won.id].points++;
          })
          .catch(collected => { // في حال لم يقم أحد بالإجابة
            message.channel.send(`:x: **لم يقم أحد بكتابة الجملة بالوقت المناسب**`);
			console.log(`[Typing] Error: No one type the word.`);
          })
		})
	})
}
});
client.on('message', message => {
if (message.content.startsWith(prefix + 'نقاطي')) {
	if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));
	let userData = points[message.author.id];
	let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
	.setColor('#000000')
	.setFooter("بوت سرعة الكتابة")
	.setDescription(`نقاطك: \`${userData.points}\``)
	message.channel.sendEmbed(embed)
  }
  fs.writeFile("./typePTS.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  })
});
client.on('guildCreate', guild => {
	console.log(`Added to a server by: ${guild.owner.user.username} || Server name: ${guild.name} || Users: ${guild.memberCount}`); // ايفنت يقوم بإرسال إلى الكونسل بأنه قد قامت احد السيرفر بدعوة البوت
});
client.on('message', message => {
if (message.content.startsWith(prefix + 'helنمp')) {
	if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));
	let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
	.setColor('#000000')
	.addField("#سرعة","**لبدأ لعبة سرعة الكتابة**")
	.addField("#نقاطي","**لعرض النقاط الخاصة بك*")
	.setFooter("بوت سرعة الكتابة")
	message.channel.sendEmbed(embed).then(m => m.delete(10000));

}
});
client.login(process.env.BOT_TOKEN);

// تعديلات بوت سرعة الكتابة الأصدار الثاني //
// 1- تم حل مشكلة إحتساب النقاط للشخص الذي قام بكتابة الأمر
// 2- تم جعل الكلمات على شكل إمبد لإعطاءه شكل جميل
// 3- والعديد من التعديلات //


// الإضافات المستقبليه //
// 1- سوف يتم تحويل الكلمات من إمبد إلى كانفس
// 2- سوف يتم تحويل النقاط من نقاط عامة إلى نقاط خاصه لكل سيرفر
// 3- سوف يتم إضافة 1000 كلمة


// 4- سوف يتم إضافة العديد من الأوامر منها //
// $تصفية //
// وهذا الأمر سوف يقوم بتصفية النقاط الخاصة بك في سيرفر معين //

// $pts //
// سوف يقوم بإرسال النقاط الخاصة بك على شكل صورة //

// السيرفر الرسمي الخاص بالفريق:
// https://discord.gg/VxatyBC //

// موفقين جميعاً
// CopyRight: NoName Team.
