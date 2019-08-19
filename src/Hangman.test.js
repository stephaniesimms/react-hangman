import React from 'react';
import { mount } from 'enzyme';
import toJson from "enzyme-to-json";
import Hangman from './Hangman';

it('renders without errors', function () {
  mount(<Hangman />);
});

it("matches snapshot", function () {
  let wrapper = mount(<Hangman />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it('disables a letter but does not update the image for a correct guess', function () {
  let wrapper = mount(<Hangman />);
  wrapper
    .find("button[value='a']")
    .simulate('click', { target: { value: "a" } });
  
    expect(wrapper.state('nWrong')).toEqual(0);
    expect(wrapper.state('guessed')).toEqual(new Set('a'));
    
    let img_elem = wrapper.find('img').first().props();
    expect(img_elem.src).toEqual("0.jpg"); 
});

it('disables a letter and updates the image for an incorrect guess', function () {
  let wrapper = mount(<Hangman />);
  wrapper
    .find("button[value='b']")
    .simulate('click', { target: { value: "b" } });

  expect(wrapper.state('nWrong')).toEqual(1);
  expect(wrapper.state('guessed')).toEqual(new Set('b'));

  let img_elem = wrapper.find('img').first().props();
  expect(img_elem.src).toEqual("1.jpg");

});

it('Number wrong will be updated with incorrect guess', function () {
  let wrapper = mount(<Hangman />);
  wrapper
    .find("button[value='b']")
    .simulate('click', { target: { value: "b" } });

  let p_element = wrapper.find('p').first().html();
  expect(p_element).toEqual("<p>Number Wrong: 1</p>");
  

});