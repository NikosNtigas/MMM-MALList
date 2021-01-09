var NodeHelper = require("node_helper")
module.exports = NodeHelper.create({
	animeList: [],
	mangaList: [],
	start: function () {

	},

	getJson: function (aList, mList) {
		this.sendSocketNotification("DATA_RESULT", {data: {anime: aList, manga: mList}})
	},

	updateJson: function (username) {
		const api = require('./jikanjs-master');
		api.loadUser(username, "animelist/watching")
			.then((aList) => {
				this.animeList = [...aList.anime]
				api.loadUser(username, "mangalist/reading")
					.then((mList) => {
						this.mangaList = [...mList.manga]
						this.getJson(this.animeList, this.mangaList)
					})
			})
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "DATA_GET") {
			this.updateJson(payload.username)
		}
	}
})
