"use strict";(self.webpackChunkgoogle_contacts=self.webpackChunkgoogle_contacts||[]).push([[411],{5411:(f,d,r)=>{r.r(d),r.d(d,{LayoutComponent:()=>m});var c=r(6895),a=r(6773),e=r(8256);let p=(()=>{class n{constructor(){this.onToggleMenu=new e.vpe}handleClick(){this.onToggleMenu.emit()}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-header"]],outputs:{onToggleMenu:"onToggleMenu"},standalone:!0,features:[e.jDz],decls:17,vars:1,consts:[[1,"grid","grid-cols-header","items-center","h-header","px-4"],[1,"flex","items-center","gap-2","text-gray"],[1,"flex","justify-center","items-center","w-[48px]","h-[48px]","cursor-pointer","hover:rounded-full","hover:bg-light-silver"],[1,"icon-menu","text-3xl",3,"click"],[1,"flex","items-center","gap-2","text-gray","text-xl","font-medium","cursor-pointer",3,"routerLink"],["src","assets/images/logo.png",1,"w-[44px]","h-[40px]"],[1,"relative","w-[90%]"],[1,"icon-magnify","absolute","top-1/2","left-3","-translate-y-1/2","text-gray","text-2xl"],["placeholder","Search",1,"w-full","bg-light-silver","h-search","rounded-md","px-12","outline-none","focus:bg-dark-white","focus:shadow-search","focus:rounded-br-none","focus:rounded-bl-none"],[1,"flex","items-center","justify-end","gap-6"],[1,"icon-help-circle-outline","text-2xl","text-gray","cursor-pointer"],[1,"icon-cog-outline","text-2xl","text-gray","cursor-pointer"],[1,"flex","items-center","justify-center","w-11","h-11","bg-blue","rounded-full","cursor-pointer"],[1,"text-white","font-medium","text-lg"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"i",3),e.NdJ("click",function(){return o.handleClick()}),e.qZA()(),e.TgZ(4,"div",4),e._UZ(5,"img",5),e._uU(6," Contacts "),e.qZA()(),e.TgZ(7,"div")(8,"div",6),e._UZ(9,"i",7)(10,"input",8),e.qZA()(),e.TgZ(11,"div",9),e._UZ(12,"i",10)(13,"i",11),e.TgZ(14,"div",12)(15,"span",13),e._uU(16,"AK"),e.qZA()()()()),2&t&&(e.xp6(4),e.Q6J("routerLink","/contact/list"))},dependencies:[c.ez,a.rH],encapsulation:2}),n})();const s=function(n){return["label",n]};function g(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"button",20)(1,"div",10),e._UZ(2,"i",21),e.TgZ(3,"span",12),e._uU(4),e.qZA()(),e.TgZ(5,"div",22)(6,"span",12),e._uU(7,"1"),e.qZA()(),e.TgZ(8,"div",23)(9,"i",24),e.NdJ("click",function(u){const x=e.CHM(t).$implicit,h=e.oxw();return e.KtG(h.handleDeleteLabel(u,x.id))}),e.qZA(),e.TgZ(10,"i",25),e.NdJ("click",function(u){const x=e.CHM(t).$implicit,h=e.oxw();return e.KtG(h.handleEditLabel(u,x.id))}),e.qZA()()()}if(2&n){const t=i.$implicit;e.Q6J("routerLinkActive","active")("routerLink",e.VKq(3,s,t.id)),e.xp6(4),e.Oqu(t.title)}}let l=(()=>{class n{constructor(t){this.router=t,this.labels=[]}handleTrackLabel(t,o){return o.id}handleDeleteLabel(t,o){t.stopPropagation(),console.log("delete label",o),this.router.navigateByUrl("/contact/list")}handleEditLabel(t,o){t.stopPropagation(),console.log("edit label",o)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(a.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-sidebar"]],inputs:{labels:"labels"},standalone:!0,features:[e.jDz],decls:34,vars:7,consts:[[1,"group","flex","items-center","gap-2","shadow-create","rounded-full","px-5","mb-5","ml-3","h-create","hover:shadow-create-hover","transition-[box-shadow]","duration-200",3,"routerLink"],["width","36","height","36","viewBox","0 0 36 36"],["fill","#34A853","d","M16 16v14h4V20z"],["fill","#4285F4","d","M30 16H20l-4 4h14z"],["fill","#FBBC05","d","M6 16v4h10l4-4z"],["fill","#EA4335","d","M20 16V6h-4v14z"],["fill","none","d","M0 0h36v36H0z"],[1,"text-dark-gray","group-hover:text-blue","font-medium","text-sm","transition-colors","duration-200"],[1,"flex","flex-col","mb-6"],[1,"flex","items-center","justify-between","font-medium","py-2","px-5","rounded-r-full","[&:not(.active)]:text-dark-gray","[&:not(.active)]:hover:bg-light-silver","[&:is(.active)]:bg-sky-blue","[&:is(.active)]:text-blue","transition-colors","duration-200",3,"routerLink","routerLinkActive"],[1,"flex","items-center","gap-4"],[1,"icon-account-outline","text-2xl"],[1,"text-sm"],[1,"flex","items-center","justify-between","text-dark-gray","font-medium","py-2","px-5","rounded-r-full","hover:bg-light-silver","transition-colors","duration-200"],[1,"icon-download-outline","text-2xl"],[1,"icon-trash-can-outline","text-2xl"],[1,"flex","flex-col"],[1,"flex","items-center","justify-between","text-dark-gray","pl-5","pr-3","mb-4"],[1,"icon-plus","w-6","h-6","flex","items-center","justify-center","text-xl","cursor-pointer","hover:bg-light-silver","rounded-full"],["class","group flex items-center justify-between font-medium py-2 px-5 rounded-r-full [&:not(.active)]:text-dark-gray [&:not(.active)]:hover:bg-light-silver [&:is(.active)]:bg-sky-blue [&:is(.active)]:text-blue transition-colors duration-200",3,"routerLinkActive","routerLink",4,"ngFor","ngForOf","ngForTrackBy"],[1,"group","flex","items-center","justify-between","font-medium","py-2","px-5","rounded-r-full","[&:not(.active)]:text-dark-gray","[&:not(.active)]:hover:bg-light-silver","[&:is(.active)]:bg-sky-blue","[&:is(.active)]:text-blue","transition-colors","duration-200",3,"routerLinkActive","routerLink"],[1,"icon-label","text-2xl"],[1,"group-hover:hidden"],[1,"hidden","items-center","gap-3","group-hover:flex"],[1,"icon-trash-can-outline","text-xl",3,"click"],[1,"icon-pencil-outline","text-xl",3,"click"]],template:function(t,o){1&t&&(e.TgZ(0,"button",0),e.O4$(),e.TgZ(1,"svg",1),e._UZ(2,"path",2)(3,"path",3)(4,"path",4)(5,"path",5)(6,"path",6),e.qZA(),e.kcU(),e.TgZ(7,"span",7),e._uU(8,"Create Contact"),e.qZA()(),e.TgZ(9,"div",8)(10,"button",9)(11,"div",10),e._UZ(12,"i",11),e.TgZ(13,"span",12),e._uU(14,"Contacts"),e.qZA()(),e.TgZ(15,"div")(16,"span",12),e._uU(17,"70"),e.qZA()()(),e.TgZ(18,"button",13)(19,"div",10),e._UZ(20,"i",14),e.TgZ(21,"span",12),e._uU(22,"Import"),e.qZA()()(),e.TgZ(23,"button",9)(24,"div",10),e._UZ(25,"i",15),e.TgZ(26,"span",12),e._uU(27,"Trash"),e.qZA()()()(),e.TgZ(28,"div",16)(29,"div",17)(30,"span",12),e._uU(31,"Labels"),e.qZA(),e._UZ(32,"i",18),e.qZA(),e.YNc(33,g,11,5,"button",19),e.qZA()),2&t&&(e.Q6J("routerLink","add"),e.xp6(10),e.Q6J("routerLink","list")("routerLinkActive","active"),e.xp6(13),e.Q6J("routerLink","trash")("routerLinkActive","active"),e.xp6(10),e.Q6J("ngForOf",o.labels)("ngForTrackBy",o.handleTrackLabel))},dependencies:[c.ez,c.sg,a.rH,a.Od],encapsulation:2}),n})();var v=r(5999);let m=(()=>{class n{constructor(t){this.contactService=t}get isExpanded(){return this.contactService.isExpanded}get labels(){return this.contactService.labels}handleToggleMenu(){this.contactService.setIsExpanded(!this.isExpanded)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(v.y))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-layout"]],standalone:!0,features:[e.jDz],decls:5,vars:3,consts:[[3,"onToggleMenu"],[1,"relative","h-contact","overflow-x-hidden"],[1,"fixed","h-contact","bottom-0","left-0","overflow-auto","w-sidebar","bg-white","py-5","aria-[expanded=true]:translate-x-0","aria-[expanded=false]:-translate-x-sidebar","transition-transform","duration-200",3,"labels"],[1,"aria-[expanded=true]:translate-x-sidebar","w-full","aria-[expanded=true]:w-contact","transition-transform","duration-200","px-5"]],template:function(t,o){1&t&&(e.TgZ(0,"app-header",0),e.NdJ("onToggleMenu",function(){return o.handleToggleMenu()}),e.qZA(),e.TgZ(1,"div",1),e._UZ(2,"app-sidebar",2),e.TgZ(3,"div",3),e._UZ(4,"router-outlet"),e.qZA()()),2&t&&(e.xp6(2),e.Q6J("labels",o.labels),e.uIk("aria-expanded",o.isExpanded),e.xp6(1),e.uIk("aria-expanded",o.isExpanded))},dependencies:[c.ez,a.Bz,a.lC,p,l],encapsulation:2}),n})()},5999:(f,d,r)=>{r.d(d,{y:()=>p});var c=r(9751),a=r(8256),e=r(529);let p=(()=>{class s{constructor(l){this.http=l,this.isExpanded=!0,this.labels=[{id:1,title:"Home"},{id:2,title:"Office"}]}setIsExpanded(l){this.isExpanded=l}getContactById(l){return new c.y}}return s.\u0275fac=function(l){return new(l||s)(a.LFG(e.eN))},s.\u0275prov=a.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()}}]);