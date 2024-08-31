function addItem(listId) { const list = document.getElementById(listId); const newItem = prompt('Ingrese el nuevo elemento (separado por ; para múltiples elementos):'); if (newItem) { const items = newItem.split(';'); items.forEach(item => { const option = document.createElement('option'); option.text = item.trim(); list.add(option); }); } } function removeItem(listId) { const list = document.getElementById(listId); for (let i = list.options.length - 1; i >= 0; i--) { if (list.options[i].selected) { list.remove(i); } } } function moveItem(sourceId, targetId) { const sourceList = document.getElementById(sourceId); const targetList = document.getElementById(targetId); const selectedOptions = Array.from(sourceList.options).filter(option => option.selected); selectedOptions.forEach(option => { targetList.add(option); }); } function copyItem(sourceId, targetId) { const sourceList = document.getElementById(sourceId); const targetList = document.getElementById(targetId); const selectedOptions = Array.from(sourceList.options).filter(option => option.selected); selectedOptions.forEach(option => { const newOption = document.createElement('option'); newOption.text = option.text; targetList.add(newOption); }); }

