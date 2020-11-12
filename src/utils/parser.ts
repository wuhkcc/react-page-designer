import YYPage from '@/pages/designer/components/YYPage';
// import dep from 'dep-mobile';
const dep = require('dep-mobile');

const DefaultParser: any = {};
for (let key in dep) {
  const comp = dep[key];
  DefaultParser[key] = comp;
}

DefaultParser.YYPage = YYPage;

export { DefaultParser };
