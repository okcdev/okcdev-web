import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-list-articles',
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesComponent implements OnInit {
  q: any = {
    ps: 5,
    categories: [],
    owners: ['zxx'],
  };

  list: any[] = [];
  loading = false;

  // region: cateogry
  categories = [
    { id: 0, text: '全部', value: false },
    { id: 1, text: '知青', value: false },
    { id: 2, text: '键盘侠', value: false },
    { id: 3, text: '二狗子', value: false },
  ];

  changeCategory(status: boolean, idx: number) {
    if (idx === 0) {
      this.categories.map(i => (i.value = status));
    } else {
      this.categories[idx].value = status;
    }
  }
  // endregion

  // region: owners
  owners = [
    {
      id: 'wzj',
      name: '我自己',
    },
    {
      id: 'wjh',
      name: '吴家豪',
    },
    {
      id: 'zxx',
      name: '周星星',
    },
    {
      id: 'zly',
      name: '赵丽颖',
    },
    {
      id: 'ym',
      name: '姚明',
    },
  ];

  setOwner() {
    this.q.owners = [`wzj`];
    // TODO: wait nz-dropdown OnPush mode
    setTimeout(() => this.cdr.detectChanges());
  }
  // endregion

  constructor(private http: _HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getData();
  }

  getData(more = false) {
    this.loading = true;
    this.http.post('/articles/list', { count: this.q.ps }).subscribe((res: any) => {
      console.log(res);
      this.list = more ? this.list.concat(res) : res.data;
      this.loading = false;
      this.cdr.detectChanges();
    });
    // this.list = [
    //   {
    //     star: 299,
    //     like: 213,
    //     message:56,
    //     owner: "xiaoshuai",
    //     href: "http://www.okcdev.cn",
    //     content:'我是一个需要仪式感生活的人。\
    //     　　一个人也要好好地喝茶。遇到节日一定要好好地庆祝。约会纪念日，登记纪念日，结婚纪念日，生日……克莱德先生这些年被这些眼花缭乱的日子搞得晕头转向，但是我一定不会淡漠地。\
    //     　　我想，我们对于生活的付出与热爱，值得我们这样庄重地对待自己。\
    //     　　职场与爱情是生命的重要内容，多重要？不知道！我们好忙！跳槽已是家常便饭，散伙饭都可以省掉；失恋分手只要发个短信通知对方即可，痛哭流涕这种戏码谁有时间来欣赏！\
    //     　　因为缺乏必要的仪式感，生命中一些特别的瞬间就这样被错过了，心不在焉地生活，自然就没有美好瞬间这种东西——不能享受当下，又哪来的美好回忆呢？\
    //     　　慢下脚步，稍事休息，花点心思在生活中增加一点小小的仪式感，两个人的晚餐会因为一张餐巾变得浪漫，普通的朋友聚会会因为扮靓出席变得摇曳生姿……\
    //     　　来，给你的生活刷一次机，把它的灰头土脸忙忙碌碌全都抹去，仪式感会让你的生活变得活色生香！\
    //     　　我非常喜欢的一部美剧《老友记》里，有这样一个有趣的桥段：\
    //     　　情人节，瑞秋、菲比和莫妮卡都没有约会对象，倍感凄凉。哀叹许久，她们认为是从前的烂桃花阻碍了幸福之路，所以必须有个了断！\
    //     　　她们参照异国的仪式，将前男友们的东西全部都烧掉，书信，首饰，衣服，统统扔到桶里去，点燃了火焰，围在旁边念咒、跳舞……结果，因为火势无法控制，惊动了消防员——好消息是，消防员里真的有大帅哥，而且对她们一见倾心。\
    //     　　今天的中国人的生活方式似乎少了一些情趣，生活节奏越来越匆忙，生命中越来越缺乏仪式感，而没有仪式感，人生就不庄严，心就不安静。\
    //     　　每个人的生活中，都会喧嚣，杂乱，无序，甚至沉沦，这时候，请慢下脚步，给它加入一点仪式感，这如同是在咖啡里加了一点糖，回味无穷，美妙非常！\
    //     　　奥黛丽·赫本的经典影片《蒂凡尼的早餐》里，霍莉会穿着黑色小礼服，戴着假珠宝，在蒂凡尼精美的橱窗前，慢慢地将早餐吃完，可颂面包与热咖啡，宛若变成盛宴。\
    //     　　这诗意的仪式感，让苍白的生活光华熠熠，映照着霍莉心中美好的向往。\
    //     　　人人都爱蒂凡尼的早餐，可是却鲜少有人扭头看看自己在生活里，仪式感有多么匮乏。\
    //     　　（现代人对于喝茶的热爱，一定程度上，也是对仪式感的迷恋）\
    //     　　恋爱久了、结婚几年之后，许多人的生活不约而同进入“死水微澜”的状态，七年之痒并非一定要天崩地裂，有时候就是不痛不痒不远不近，味同嚼蜡。\
    //     　　告别热恋时五彩斑斓的颜色，恋爱时盛装约会、忐忑见面的心情，在平淡生活里日复一日的消磨，甚至连约会纪念日、结婚纪念日这些曾经非常珍视的日子，都可以淡漠平常地度过——许多人只顾匆忙赶路，埋葬快乐。\
    //     　　婚姻中的仪式感，想要拥有也很简单——约会纪念日、结婚纪念日要记得，吃一顿浪漫的烛光晚餐，若是来不及买礼物送一个深深的吻也会让人久久难忘；彼此的生日不能忘记，亲手做一个再丑的蛋糕都会令对方感动；哪怕是再普通的晚餐也可以用精致的餐具，铺上餐巾，仪式感顿生……\
    //     　　许多人喜欢在客厅吃饭，一边看电视一边应付了事。\
    //     　　现在起，即便只有两个人，也要在餐桌上用餐，一心一意地吃晚餐，说说各自一天的见闻与心情，交流不就是这样子的吗？\
    //     　　就算是再平常的小事，带着仪式感去做，就能够对抗生活中的消极因素。\
    //     　　陈莹月是个单身的职场狂人，她把女人对仪式感的追求与热爱，全都放在了工作中。\
    //     　　从小生活在重视仪式感的家庭氛围里，从小时候就眼见着父母会很认真地过每个节日，后来她到外地上大学，生日的时候父母依然会在家里下一碗生日面，和她一起庆生。\
    //     　　陈莹月说，仪式感很美好，她会感觉到成绩得到了认可，悲伤也会被立刻消化掉。\
    //     　　她第一份工作是做设计师助理，签约那天，父母从外地赶了过来，带了很多好吃的，替她庆祝，她至今提起都感动得眼眶发红，“也许在别人看来那是一份很普通的工作，但是我爸妈说我凭着自己的能力找到一份工作，从此以后自力更生，这是很值得荣耀的事情！那就是我的成人礼，从那天开始，我觉得自己更加成熟了！”\
    //     　　签第一笔单，做好第一个大客户，跳槽到一个更好的公司……这些年工作上的每一个进步，陈莹月都会庆祝一下，有时候是呼朋唤友去吃一顿大餐，有时候是去商场为自己挑一件礼物作为奖励，物质也许并不是最重要的，但是这种带着奖励心情去领取的回忆却独一无二。\
    //     　　每次跳槽，她都会吃一次散伙饭，“我需要一个仪式，让我告别过去，开始一段新的旅程，我会谢谢他们的宽容和陪伴，工作中所有的小尴尬小冲突，一杯酒就化解了，以后的日子里再也不必介怀——若是没有这一顿饭，醉后的倾心交谈，也许抢过我客户的人我会怨念他一辈子吧？！”\
    //     　　工作的时间久了，人们往往只看业绩，看数字，今天必须要多过昨天，仿佛这才是王道，“除非是老板提醒我，否则我从来不比较今年与去年的业绩，我只是在今年的每个收获后都要庆祝一下，然后就一直开心！”',
    //     title:'生活需要仪式感',
    //     updatedAt: '2019-04-01 10:54'
    //   },
    //   {
    //     star: 199,
    //     like: 163,
    //     message: 11,
    //     owner: "xiaoshuai",
    //     href: "http://www.okcdev.cn",
    //     content:'我常常想，人是一种很悲剧的动物:当你慢慢懂得了一些事情时，你发现时间其实已经过去一大半了!我们总是在最美好的年华错过了应该那个年纪懂的一些道理。当我们懂得那个道理的时候，我们已经步入一个新的年龄段。这种滞后与生俱来，基因无法将一些经验传递给下一代，但是可以通过书籍来完成。然而更悲剧的是：当前辈用自己的一辈子得到的感悟写成的书告诉我们的道理， 年少轻狂的我们根本不会领悟里面的生命哲学， 一定要自己趟一遍，才能感悟到，噢 ，原来书上写的是对的，该趟的，还是要趟一遍。这也有好有坏，因为时间在演进，世界也在变化。',
    //     title:'前辈的话',
    //     updatedAt: '2019-03-28 17:54'
    //   },
    //   {
    //     star: 199,
    //     like: 163,
    //     message: 11,
    //     owner: "xiaoshuai",
    //     href: "http://www.okcdev.cn",
    //     content:'段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
    //     title:'Ant Design',
    //     updatedAt: '2019-03-28 17:54'
      // }
    // ];
  }
}