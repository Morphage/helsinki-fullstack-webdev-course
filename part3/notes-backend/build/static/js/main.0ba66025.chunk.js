(this["webpackJsonpnotes-app"]=this["webpackJsonpnotes-app"]||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(13),c=n.n(o),u=n(14),i=n(2),l=function(){return r.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},r.a.createElement("br",null),r.a.createElement("em",null,"Note app, Department of Computer Science, University of Helsinki 2019"))},m=function(e){var t=e.note,n=e.toggleImportance,a=t.important?"make not important":"make important";return r.a.createElement("li",{className:"note"},t.content,r.a.createElement("button",{onClick:n},a))},f=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"error"},t)},s=n(3),p=n.n(s),d="https://serene-wildwood-11914.herokuapp.com/notes",E=function(){return p.a.get(d).then((function(e){return e.data}))},v=function(e){return p.a.post(d,e).then((function(e){return e.data}))},b=function(e,t){return p.a.put("".concat(d,"/").concat(e),t).then((function(e){return e.data}))},h=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(""),s=Object(i.a)(c,2),p=s[0],d=s[1],h=Object(a.useState)(!0),g=Object(i.a)(h,2),j=g[0],O=g[1],k=Object(a.useState)("some error happened..."),S=Object(i.a)(k,2),w=S[0],y=S[1];Object(a.useEffect)((function(){E().then((function(e){o(e)}))}),[]);var N=j?n:n.filter((function(e){return e.important}));return r.a.createElement("div",null,r.a.createElement("h1",null,"Notes"),r.a.createElement(f,{message:w}),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return O(!j)}},"show ",j?"important":"all")),r.a.createElement("ul",null,N.map((function(e){return r.a.createElement(m,{key:e.id,note:e,toggleImportance:function(){return function(e){var t=n.find((function(t){return t.id===e})),a=Object(u.a)({},t,{important:!t.important});b(e,a).then((function(t){o(n.map((function(n){return n.id!==e?n:t})))})).catch((function(){y("Note '".concat(t.content,"' was already removed from server")),setTimeout((function(){y(null)}),5e3),o(n.filter((function(t){return t.id!==e})))}))}(e.id)}})}))),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={content:p,date:new Date,important:Math.random()>.5};v(t).then((function(e){o(n.concat(e)),d("")}))}},r.a.createElement("input",{value:p,onChange:function(e){console.log(e.target.value),d(e.target.value)}}),r.a.createElement("button",{type:"submit"},"save")),r.a.createElement(l,null))};n(37);c.a.render(r.a.createElement(h,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.0ba66025.chunk.js.map