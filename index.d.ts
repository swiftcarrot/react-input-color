import { Component } from 'react';

export class Color {
  h: number;
  s: number;
  v: number;
  r: number;
  g: number;
  b: number;
  a: number;
  hex: string;
}

export interface InputColorProps {
  initialHexColor: string;
  placement?: string;
  onChange?(color: Color): void;
}

export default function InputColor(props: InputColorProps)
