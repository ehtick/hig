import './project-account-switcher.scss';

var Template = require('./project-account-switcher.html');
var Interface = require('interface.json');
var Core = require('_core.js');

var Button = require('../../../../basics/button/button.js');
var Flyout = require('../../../../basics/flyout/flyout.js');
var Project = require('./project/project.js');
var Account = require('./account/account.js');
var Lists = require('./_lists/lists.js');
var Target = require('./_target/target.js');

/**
 * Creates an ProjectAccountSwitcher
 *
 * @class
 */

class ProjectAccountSwitcher extends Core {

    constructor(options){
        super(options);

        this.flyout = new Flyout();
        this.target = new Target({ label: options.activeLabel, image: options.activeImage });
        this.flyoutContent = new Lists();

        this._render(Template, options);
    }

    _componentDidMount() {
        this.mountPartialToComment('FLYOUT', this.flyout);
        this.flyout.addTarget(this.target);
        this.flyout.addSlot(this.flyoutContent);
    }

    addProject(newInstance, referenceInstance) {
        this.flyoutContent.addProject(newInstance, referenceInstance);
    }

    addAccount(newInstance, referenceInstance) {
        this.flyoutContent.addAccount(newInstance, referenceInstance);
    }

    onClick(fn) {
        return this.target.onClick(fn);
    }

    open() { this.flyout.open(); }

    close() { this.flyout.close(); }

    onClickOutside() { this.flyout.onClickOutside(); }

}

ProjectAccountSwitcher._interface = Interface['components']['GlobalNav']['partials']['TopNav']['partials']['ProjectAccountSwitcher'];
ProjectAccountSwitcher._defaults = {};
ProjectAccountSwitcher._partials = {
    Account: Account,
    Project: Project
};

module.exports = ProjectAccountSwitcher;