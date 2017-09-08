/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-09-04 18:43:21
 * @version $Id$
 */

// 存取localstorage中的数据


// var lists = [
// 	{
// 		title : "有好多好多早餐在这里",
// 		isChecked : false
// 	},
// 	{
// 		title : "在我们最熟悉的早餐店里",
// 		isChecked : false
// 	}
// ];
 var store = {
 	save(key, value) {
 		localStorage.setItem(key, JSON.stringify(value));
 	},

 	fetch(key) {
 		return JSON.parse(localStorage.getItem(key)) || [];
 	}
 };

var list = store.fetch("my-data");

var vm = new Vue({
	el : "#vuediv",
	data : {
		lists : list,
		todo : "",
		hashValue : "all"
	},
	watch : {			//监控lists这个属性，当这个属性对应的值发生变化就会执行函数
		lists : {
			handler(){
				store.save("my-data", this.lists);
			},
			deep:true
		}
	},
	computed : {	//当数据发生改变时，计算属性重新改变其值
		notFinished() {
			return this.lists.filter(function(item) {
				return !item.isChecked;
			}).length;
		},
		finallList : function() {
			var er = {
				all:function(list) {
					return list;
				},
				finished:function(list){
					return list.filter(function(item) {
						return item.isChecked;
					})
				},
				unfinished:function(list){
					return list.filter(function(item) {
						return !item.isChecked;
					});
				}
			};

			return er[this.hashValue] ? er[this.hashValue](list) : list;
		}
	},
	methods : {
		addItem(item) {
			this.lists.push({
				title : item,
				isChecked : false
			});

			this.todo = "";
		},

		removeItem(item) {
			var index = this.lists.indexOf(item);
			this.lists.splice(index, 1);
		}
	}
});

//watchHash();

window.addEventListener("hashchange", function watchHash(e){
	var hash = window.location.hash.slice(1);
	console.log(hash);
	vm.hashValue = hash;
});

