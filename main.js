document.querySelector('#sort-asc').onclick = function () {
    sortList('data-price');
}
document.querySelector('#sort-desc').onclick = function () {
    sortListDesc('data-price');
}
document.querySelector('#sort-category').onclick = function () {
    sortListDesc('data-category');
}
document.querySelector('#sort-nal').onclick = function () {
    sortListDesc('data-nal');
}

function sortList(sortType) {
    let items = document.querySelector('.products-grid');
    for (let i = 0; i < items.children.length - 1; i++) {
        for (let j = i; j < items.children.length; j++) {
            if (+items.children[i].getAttribute(sortType) > +items.children[j].getAttribute(sortType)) {
                console.log(1);
                let replacedNode = items.replaceChild(items.children[j], items.children[i]);
                insertAfter(replacedNode, items.children[i]);
            }
        }
    }
}

function sortListDesc(sortType) {
    let items = document.querySelector('.products-grid');
    for (let i = 0; i < items.children.length - 1; i++) {
        for (let j = i; j < items.children.length; j++) {
            if (+items.children[i].getAttribute(sortType) < +items.children[j].getAttribute(sortType)) {
                console.log(1);
                let replacedNode = items.replaceChild(items.children[j], items.children[i]);
                insertAfter(replacedNode, items.children[i]);
            }
        }
    }
}
    var lst = document.querySelector('.products-grid');
    Object.defineProperties(lst, {
        _direct: {
            /**
             *  Направление сортировки
             *  0 - a->z
             *  1 - z->a
             */
            value: 1,
            writable: true
        },

        direct: {
            get: function () {
                return this._direct;
            },
            set: function (val) {
                this._direct = Math.abs(this._direct - 1);
            },
            enumerable: true,
            configurable: true
        },
        _dataArr: {
            /* Массив с данными */
            value: [],
            writable: true,
        },
        data: {
            /* Получить массив с данными */
            get: function () {
                let _that = this;
                if (!this._dataArr.length) {
                    /* Если массив пуст, получим данные */
                    [].map.call(this.children, function (_row) {
                        let _dataRow = {
                            title: _row.children[0].innerHTML,
                            
                            element: _row
                        }
                        _that._dataArr.push(_dataRow);
                    });
                }
                /* В любом случае возвертаем массив */
                return this._dataArr;
            }
        },
        sortByAlphabet: {
            value: function () {
                let _that = this;
                this.data.sort(function (a, b) {
                    if (_that.direct) {
                        return a.title > b.title ? 1 : -1;
                    } else {
                        return a.title > b.title ? -1 : 1;
                    }
                });

                this.direct = true;
                this.drawRows();
            },
            writable: false
        },
        
        drawRows: {
            value: function () {
                for (let i = 0; i < this.data.length; i++) {
                    this.appendChild(this.removeChild(this.data[i].element));
                }
            },
            writable: false
        }
    });
    document.addEventListener('click', function (ev) {
        if (ev.target.hasAttribute('data-sort')) {
            switch (ev.target.getAttribute('data-sort')) {
                case 'alphabet':
                    lst.sortByAlphabet();
                    break;
                
            }
        }
    });

function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}