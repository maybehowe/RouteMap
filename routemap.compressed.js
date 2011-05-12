(function(D,E){(function(a,b){if(!a.every||!a.filter||!a.indexOf||!a.map||!a.reduce||!a.some||!a.forEach)throw Error("See "+b+" for reference versions of Array.prototype methods available in JS 1.8");})([],"https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/");var o,j={},s={},q=[],y=0,u=0,z=encodeURIComponent,A=decodeURIComponent,t="#",F=/\*|:|\?/,G=/(^([^\*:\?]+):\*)|(^\*$)/,H=/^:([^\*:\?]+)(\??)$/,I=/^([^\*:\?]+):(\??)$/,B=/([^\/])$/,v=typeof window!=="undefined"?window:
{},p=function(a){return typeof a!=="string"||!a.length},C=function(a){var b=q.filter(function(c){return B.exec(a),~a.replace(B,RegExp.$1+"/").indexOf(c)}).filter(function(c,d){return!d||j[c].some(function(e){return!!e.rules.star})});return!b.length?[]:b.reduce(function(c,d){var e=j[d].map(function(f){var h={},m=f.rules.scalars,k=f.rules.keyvals,w,i=a.replace(d,"").split("/").reduce(function(g,l){var r=l.split("="),J=r[0];r=r.slice(1).join("=");return!l.length||(r?g.keyvals[J]=r:g.scalars.push(l)),
g},{keyvals:{},scalars:[]}),n,K=k.reduce(function(g,l){return(g[l.name]=0)||g},{}),L=m.filter(function(g){return g.required}).length,M=k.filter(function(g){return g.required}).every(function(g){return i.keyvals.hasOwnProperty(g.name)});if(L>i.scalars.length||!M)return 0;if(!f.rules.star){if(i.scalars.length>m.length)return 0;for(n in i.keyvals)if(i.keyvals.hasOwnProperty(n)&&!K.hasOwnProperty(n))return 0}i.scalars.slice(0,m.length).forEach(function(g,l){h[m[l].name]=A(g)});k.forEach(function(g){if(i.keyvals[g.name])h[g.name]=
A(i.keyvals[g.name]);delete i.keyvals[g.name]});if(f.rules.star){k=i.scalars.slice(m.length,i.scalars.length);for(n in i.keyvals)i.keyvals.hasOwnProperty(n)&&k.push([n,i.keyvals[n]].join("="));h[f.rules.star]=k.join("/")}try{w=f.method.split(".").reduce(function(g,l){return g[l]},v);if(typeof w!=="function")throw Error();}catch(N){throw new TypeError("parse: "+f.method+" is not a function in current context");}return{page:d,hash:o.hash({route:f.raw},h),method:w,args:h}});return c.concat(e).filter(Boolean)},
[]).sort(function(c,d){return d.hash.length-c.hash.length})},x=function(){var a={};return function(b){var c;c=b;var d;b=b[0]==="/"?b:~(d=b.indexOf("/"))?b.slice(d):null;if(!b)throw new SyntaxError('compile: the route "'+c+'" was not understood');if(a[b])return a[b];c=b.split("/").reduce(function(e,f){var h=e.rules,m=h.scalars,k=h.keyvals;if(h.star)throw new SyntaxError("compile: no rules can follow a * directive");if(!~f.search(F)&&!m.length&&!k.length)return e.page.push(f),e;if(f.match(G))return h.star=
RegExp.$2||RegExp.$3,e;if(f.match(H)){if(RegExp.$2&&e.last_optional)throw new SyntaxError('compile: "'+f+'" cannot follow an optional rule');if(RegExp.$2)e.last_optional=f;return m.push({name:RegExp.$1,required:!RegExp.$2}),e}if(f.match(I))return k.push({name:RegExp.$1,required:!RegExp.$2}),e;throw new SyntaxError('compile: the rule "'+f+'" was not understood');},{page:[],rules:{scalars:[],keyvals:[],star:false},last_optional:""});delete c.last_optional;c.page=c.page.join("/").replace(/\/$/,"")||
"/";return a[b]=c}}();D[E]=o={add:function(a){var b=a.method,c=a.route,d=[a.method,a.route].join("|");if([c,b].some(p))throw new TypeError("add: rule.route and rule.method must both be non-empty strings");if(s[d])throw Error("add: "+c+" to "+b+" already exists");a=x(c);s[d]=true;if(!j[a.page]&&(j[a.page]=[]))q=q.concat(a.page).sort(function(e,f){return f.length-e.length});j[a.page].push(o.post_add({method:b,rules:a.rules,raw:c}))},context:function(a){return v=typeof a==="object"?a:v},current:function(){return u},
default_handler:function(){},get:function(){if(typeof window==="undefined")return"/";var a=window.location.hash,b=a.indexOf("/");return~b?a.slice(b):"/"},go:function(a){if(typeof window!=="undefined")window.location.hash=(a.indexOf(t)===0?"":t)+a},handler:function(){var a=o.get(),b=C(a),c=Array.prototype.slice.call(arguments);if(!b.length)return o.default_handler.apply(null,[a].concat(c));u=b[0];b=o.pre_dispatch(b);u=b[0];b.forEach(function(d){d.method.apply(null,[d.args].concat(c))});y=b[0]},hash:function(a,
b){var c,d;b=b||{};if(p(a.route))throw new TypeError("hash: rule.route must be a non-empty string");d=x(a.route);c=d.page+(d.page==="/"?"":"/")+d.rules.scalars.map(function(e){var f=z(b[e.name]),h=b[e.name]===void 0||p(f);if(e.required&&h)throw new TypeError("hash: params."+e.name+" is undefined");return h?0:f}).concat(d.rules.keyvals.map(function(e){var f=z(b[e.name]),h=b[e.name]===void 0||p(f);if(e.required&&h)throw new TypeError("hash: params."+e.name+" is undefined");return h?0:e.name+"="+f})).filter(Boolean).join("/");
if(d.rules.star&&b[d.rules.star])c+=(c[c.length-1]==="/"?"":"/")+b[d.rules.star];return c},last:function(){return y},parse:function(a){var b;b=a.indexOf("/");a=~b?a.slice(b):"";if(p(a))throw new TypeError("parse: hash must be a string with a / character");if(!(b=C(a)).length)throw new SyntaxError("parse: "+a+" cannot be parsed");return{page:b[0].page,args:b[0].args}},post_add:function(a){return a},pre_dispatch:function(a){return a},prefix:function(a){return t=typeof a!=="undefined"?a+"":t},remove:function(a){var b=
a.method,c=a.route,d=[a.method,a.route].join("|");if([c,b].some(p))throw new TypeError("remove: rule.route and rule.method must both be non-empty strings");if(s[d]){a=x(c);delete s[d];j[a.page]=j[a.page].filter(function(e){return e.raw!==c||e.method!==b});if(!j[a.page].length&&delete j[a.page])if(~(a=q.indexOf(a.page)))q.splice(a,1)}}}})(typeof exports==="undefined"?window:exports,"RouteMap");