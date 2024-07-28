const List = {
  list: [
    {
      id: 1,
      columns: ['', '']
    },
    {
      id: 2,
      columns: ['', '']
    },
    {
      id: 3,
      columns: ['', '']
    },
    {
      id: 4,
      columns: ['', '']
    },
    {
      id: 5,
      columns: ['', '']
    },
    {
      id: 6,
      columns: ['', '']
    },
  ],

  // getList: function () {
  //   if (typeof window !== "undefined" && localStorage.getItem("theList")) {
  //     return JSON.parse(localStorage.getItem("theList"));
  //   }
  //   return this.list;
  // },
  // saveList: function (list) {
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("theList", JSON.stringify(list));
  //   }
  // }
  getList: function () {
    return (
      (localStorage.getItem("theList") &&
        JSON.parse(localStorage.getItem("theList"))) ||
      this.list
    );
  },
  saveList: (list) => {
    localStorage.setItem("theList", JSON.stringify(list));
  },
};

export default List;
