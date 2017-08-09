
import { mount } from 'enzyme';
import * as HIG from 'hig-vanilla';
import React from 'react';

import GlobalNav from '../../../adapters/GlobalNav/GlobalNavAdapter';
import SectionList from '../../../elements/components/GlobalNav/SectionList';
import Section from './SectionAdapter';
import Group from './GroupAdapter';
import Module from './ModuleAdapter';
import Submodule from './SubmoduleAdapter';
import SideNav from './SideNavAdapter';

const Context = props => {
  const { children, ...rest } = props;
  return (
    <GlobalNav>
      <GlobalNav.SideNav>
        <GlobalNav.SideNav.SectionList>
          <Section {...rest}>
            {children}
          </Section>
        </GlobalNav.SideNav.SectionList>
      </GlobalNav.SideNav>
    </GlobalNav>
  );
};

function higContext(defaults) {
  const higContainer = document.createElement('div');

  const higNav = new HIG.GlobalNav();

  higNav.mount(higContainer);

  const higSideNav = new higNav.partials.SideNav();
  higNav.addSideNav(higSideNav);

  const higSection = new higSideNav.partials.Section(defaults);

  higSideNav.addSection(higSection);

  return { higNav, higSideNav, higSection, higContainer };
}

describe('<Section>', () => {
  describe('headerLabel', () => {
    it('sets the headerLabel default', () => {
      const defaults = { headerLabel: 'some label' };

      const { higContainer } = higContext(defaults);

      const reactContainer = document.createElement('div');

      const wrapper = mount(<Context {...defaults} />, {
        attachTo: reactContainer
      });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      expect(reactContainer.firstChild.outerHTML).toEqual(
        higContainer.firstChild.outerHTML
      );
    });

    it('updates the headerLabel', () => {
      const defaults = { headerLabel: 'some label' };

      const { higSection, higContainer } = higContext(defaults);

      const reactContainer = document.createElement('div');

      const wrapper = mount(<Context {...defaults} />, {
        attachTo: reactContainer
      });

      const newHeaderLabel = 'new header label';

      // hig-vanilla API
      higSection.setHeaderLabel(newHeaderLabel);

      // React API
      wrapper.setProps({ headerLabel: newHeaderLabel });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      expect(reactContainer.firstChild.outerHTML).toEqual(
        higContainer.firstChild.outerHTML
      );
    });

    it('logs an error if the headerLabel is not the correct type', () => {
      global.console.error = jest.fn();

      mount(<Context headerLabel={[]} />);

      expect(console.error).toBeCalledWith(
        expect.stringMatching(
          /Invalid prop `headerLabel` of type `array` supplied to `Section`, expected `string`./
        )
      );
    });
  });

  describe('headerName', () => {
    it('sets the headerName default', () => {
      const defaults = { headerName: 'some label' };

      const { higContainer } = higContext(defaults);

      const reactContainer = document.createElement('div');

      const wrapper = mount(<Context {...defaults} />, {
        attachTo: reactContainer
      });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      expect(reactContainer.firstChild.outerHTML).toEqual(
        higContainer.firstChild.outerHTML
      );
    });

    it('updates the headerName', () => {
      const defaults = { headerName: 'some label' };

      const { higSection, higContainer } = higContext(defaults);

      const reactContainer = document.createElement('div');

      const wrapper = mount(<Context {...defaults} />, {
        attachTo: reactContainer
      });

      const newHeaderName = 'new header name';

      // hig-vanilla API
      higSection.setHeaderName(newHeaderName);

      // React API
      wrapper.setProps({ headerName: newHeaderName });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      expect(reactContainer.firstChild.outerHTML).toEqual(
        higContainer.firstChild.outerHTML
      );
    });

    it('logs an error if the headerName is not the correct type', () => {
      global.console.error = jest.fn();

      mount(<Context headerName={[]} />);

      expect(console.error).toBeCalledWith(
        expect.stringMatching(
          /Invalid prop `headerName` of type `array` supplied to `Section`, expected `string`./
        )
      );
    });
  });

  describe('children: <Group>', () => {
    it('can render a list of <Group> elements', () => {
      const defaults = { headerLabel: 'some label' };

      const { higSection, higContainer } = higContext(defaults);

      var group1 = new higSection.partials.Group();
      higSection.addGroup(group1);

      var group2 = new higSection.partials.Group();
      higSection.addGroup(group2);

      const reactContainer = document.createElement('div');

      const wrapper = mount(
        <Context {...defaults}>
          <Group />
          <Group />
        </Context>,
        {
          attachTo: reactContainer
        }
      );

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      expect(reactContainer.firstChild.outerHTML).toEqual(
        higContainer.firstChild.outerHTML
      );
    });

    it('can insert <Group> elements before and after another <Group>', () => {
      const defaults = { headerLabel: 'some label' };

      const { higSection, higContainer } = higContext(defaults);

      var group1 = new higSection.partials.Group();

      // DELIBERATELY DON'T ADD GROUP 1

      var group2 = new higSection.partials.Group();
      higSection.addGroup(group2);

      // ADD GROUP 1 before GROUP 2
      higSection.addGroup(group1, group2);

      class CustomComponent extends React.Component {
        constructor(props) {
          super(props);
          this.state = { showingItemBefore: false, showingItemAfter: false };
        }

        render() {
          return (
            <Context {...defaults}>
              {this.state.showingItemBefore && <Group />}
              <Group />
              {this.state.showingItemAfter && <Group />}
            </Context>
          );
        }
      }

      const reactContainer = document.createElement('div');
      const wrapper = mount(<CustomComponent />, {
        attachTo: reactContainer
      });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      wrapper.setState({ showingItemBefore: true });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      expect(reactContainer.firstChild.outerHTML).toEqual(
        higContainer.firstChild.outerHTML
      );

      wrapper.setState({ showingItemBefore: false });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      wrapper.setState({ showingItemAfter: true });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      wrapper.setState({ showingItemAfter: false });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();
    });

    it('can not render HTML elements as children', () => {
      global.console.error = jest.fn();

      mount(
        <Context>
          <div>Hello world!</div>
        </Context>
      );

      expect(console.error).toBeCalledWith(
        expect.stringMatching(
          /'div' is not a valid child of Section. Children should be of type 'GroupAdapter, SectionCollapseAdapter'/
        )
      );
    });

    it('can not render HTML text as children', () => {
      global.console.error = jest.fn();

      mount(
        <Context>
          Hello world!
        </Context>
      );

      expect(console.error).toBeCalledWith(
        expect.stringMatching(
          /'Hello world!' is not a valid child of Section. Children should be of type 'GroupAdapter, SectionCollapseAdapter'/
        )
      );
    });
  });
});
