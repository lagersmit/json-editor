// Base Foundation theme
JSONEditor.defaults.themes.purecss = JSONEditor.AbstractTheme.extend({
  getContainer: function() {
    var el = document.createElement('div');
    el.className += 'pure-form pure-form-stacked';
    return el;
  },
  getFormControl: function(label, input, description, infoText) {
    var el = document.createElement('div');
    el.className = 'pure-control-group';
    if(label) el.appendChild(label);
    if(input.type === 'checkbox' && label) {
      label.insertBefore(input,label.firstChild);
      if(infoText) label.appendChild(infoText);
    }
    else {
      if(infoText) label.appendChild(infoText);
      el.appendChild(input);
    }

    if(description) el.appendChild(description);
    return el;
  },
  getChildEditorHolder: function() {
    var el = document.createElement('div');
    el.style.marginBottom = '15px';
    return el;
  },
  getSelectInput: function(options) {
    var el = this._super(options);
    el.style.minWidth = 'none';
    el.style.padding = '5px';
    el.style.marginTop = '3px';
    el.style.width = '90%';
    return el;
  },
  getSwitcher: function(options) {
    var el = this._super(options);
    el.style.paddingRight = '8px';
    return el;
  },
  afterInputReady: function(input) {
    if(input.group) return;
    if(this.closest(input,'.compact')) {
      input.style.marginBottom = 0;
    }
    input.group = this.closest(input,'.form-control');
    if (this.queuedInputErrorText) {
        var text = this.queuedInputErrorText;
        delete this.queuedInputErrorText;
        this.addInputError(input,text);
    }
  },
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.display = 'inline-block';
    return el;
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    // el.style.marginBottom = type==='checkbox'? '0' : '12px';
    el.style.width = '90%';
    return el;
  },
  getFormInputDescription: function(text) {
    var el = document.createElement('p');
    el.textContent = text;
    el.style.marginTop = '-10px';
    el.style.fontSize = '.8rem';
    return el;
  },
  setGridColumnSize: function(el,size) {
    var result = 12 / size;
    if (result % 1 != 0) {
      result = size+"-24";
    } else {
      result = '1-'+result;
    }


    el.className = 'pure-u-1 pure-u-md-'+result+' test-'+size; //+size;
  },
  getGridRow: function() {
    var el = document.createElement('div');
    var el2 = document.createElement('div');
    el.className = 'pure-g';
    el2.className = '1-box';
    el.appendChild(el2);
    return el;
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'panel';
    el.style.paddingBottom = 0;
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.display = 'inline-block';
    el.style.marginLeft = '10px';
    el.style.verticalAlign = 'middle';
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'button-group';
    el.style.display = "";



    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.className += ' pure-button-primary pure-button';
    el.style.fontSize = '0.75em';

    el.onclick = function () {
      var open_options = document.querySelectorAll(".options_open");
      for (var i=0; i<open_options.length; i++) {
        open_options[i].classList.remove("options_open");
      }
    };
    return el;
  },
  getHeader: function(text) {
    var el = document.createElement('h3');
    if(typeof text === "string") {
      el.textContent = text;
    }
    else {
      el.appendChild(text);
    }

    el.classList.add("title_header");
    el.onclick = function() {
      if (el.classList.contains("options_open")) {
        el.classList.remove("options_open");

      } else {
        var open_options = document.querySelectorAll(".options_open");
        for (var i=0; i<open_options.length; i++) {
          open_options[i].classList.remove("options_open");
        }
        el.classList.add("options_open");
      }
    };
    var menubutton = document.createElement("div");
    menubutton.style.display = 'inline-block';
    menubutton.style.verticalAlign = 'middle';
    menubutton.style.marginLeft = "10px";
    for (var i=0; i<3; i++) {
      var line = document.createElement("div");
      line.style.height = "2px";
      line.style.width = "25px";
      line.style.backgroundColor = "grey";
      if (i<3) {
        line.style.margin = "6px 0px";
      }
      menubutton.appendChild(line);
    }

    el.appendChild(menubutton);

    return el;
  },
  addInputError: function(input,text) {
    if(!input.group) {
        this.queuedInputErrorText = text;
        return;
    }
    input.group.className += ' error';

    if(!input.errmsg) {
      input.insertAdjacentHTML('afterend','<small class="error"></small>');
      input.errmsg = input.parentNode.getElementsByClassName('error')[0];
    }
    else {
      input.errmsg.style.display = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.group) {
        delete this.queuedInputErrorText;
    }
    if(!input.errmsg) return;
    input.group.className = input.group.className.replace(/ error/g,'');
    input.errmsg.style.display = 'none';
  },
  getProgressBar: function() {
    var progressBar = document.createElement('div');
    progressBar.className = 'progress';

    var meter = document.createElement('span');
    meter.className = 'meter';
    meter.style.width = '0%';
    progressBar.appendChild(meter);
    return progressBar;
  },
  updateProgressBar: function(progressBar, progress) {
    if (!progressBar) return;
    progressBar.firstChild.style.width = progress + '%';
  },
  updateProgressBarUnknown: function(progressBar) {
    if (!progressBar) return;
    progressBar.firstChild.style.width = '100%';
  },
  getInputGroup: function(input, buttons) {
    if (!input) return undefined;

    var inputGroupContainer = document.createElement('div');
    inputGroupContainer.className = 'input-group';
    input.classList.add('input-group-field');
    inputGroupContainer.appendChild(input);

    for(var i=0;i<buttons.length;i++) {
      var inputGroup = document.createElement('div');
      inputGroup.className = 'input-group-button';
      inputGroup.style.verticalAlign = 'top';
      buttons[i].classList.remove('small');
      inputGroup.appendChild(buttons[i]);
      inputGroupContainer.appendChild(inputGroup);
    }

    return inputGroupContainer;
  }
});

