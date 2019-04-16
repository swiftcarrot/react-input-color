import React from 'react';
import renderer from 'react-test-renderer';
import InputColor from '../';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

test('render', () => {
  const component = renderer.create(<InputColor initialHexColor="#3498db" />);
  expect(component.toJSON()).toMatchInlineSnapshot(`
Array [
  <div
    className="css-4pzrmt"
    id="popover500000"
    style={Object {}}
  >
    <div
      className="css-kpm0v2"
      data-arrow="true"
      id="arrow500000"
    />
    <div
      className="css-k7kym8"
    >
      <div
        className="css-18b3riz-ColorPicker"
        onClick={[Function]}
      >
        <div
          className="css-1cxzg2x-ColorPicker"
          style={
            Object {
              "backgroundColor": "#0099ff",
            }
          }
        >
          <div
            className="css-18il0wb-ColorPicker"
          />
          <div
            className="css-1w4rorc-ColorPicker"
          />
          <div
            className="css-rqkh66"
            onClick={[Function]}
          >
            <div
              className="css-0"
              style={Object {}}
            />
            <div
              className="css-7tbr81"
              onClick={[Function]}
              onMouseDown={[Function]}
              onTouchStart={[Function]}
              style={
                Object {
                  "left": "76%",
                  "top": "14.000000000000002%",
                }
              }
            />
          </div>
        </div>
        <div
          className="css-1an3gz2-ColorPicker"
        >
          <div
            className="css-k21g5k-ColorPicker"
          >
            <div
              className="css-qdqe8r"
              onClick={[Function]}
            >
              <div
                className="css-17jxise"
                style={
                  Object {
                    "width": "56.824512534818936%",
                  }
                }
              />
              <div
                className="css-16bcybd"
                onClick={[Function]}
                onMouseDown={[Function]}
                onTouchStart={[Function]}
                style={
                  Object {
                    "left": "56.824512534818936%",
                    "top": "0%",
                  }
                }
              />
            </div>
            <div
              className="css-1j7mp1d"
              onClick={[Function]}
            >
              <div
                className="css-17jxise"
                style={
                  Object {
                    "width": "100%",
                  }
                }
              />
              <div
                className="css-16bcybd"
                onClick={[Function]}
                onMouseDown={[Function]}
                onTouchStart={[Function]}
                style={
                  Object {
                    "left": "100%",
                    "top": "0%",
                  }
                }
              />
            </div>
          </div>
          <div
            style={
              Object {
                "backgroundColor": "rgba(52,152,219,1)",
                "height": 30,
                "width": 30,
              }
            }
          />
        </div>
        <div
          className="css-1i9dzpr-ColorPicker"
        >
          <div
            className="css-1xnfy-ColorPicker"
          >
            <input
              onChange={[Function]}
              onKeyUp={[Function]}
              style={
                Object {
                  "textAlign": "left",
                  "width": 70,
                }
              }
              type="text"
              value="#3498db"
            />
            <div>
              Hex
            </div>
          </div>
          <div
            className="css-1xnfy-ColorPicker"
          >
            <input
              autoComplete="off"
              className="css-1j3bwou"
              onChange={[Function]}
              onKeyDown={[Function]}
              onWheel={[Function]}
              type="text"
              value={52}
            />
            <div>
              R
            </div>
          </div>
          <div
            className="css-1xnfy-ColorPicker"
          >
            <input
              autoComplete="off"
              className="css-1j3bwou"
              onChange={[Function]}
              onKeyDown={[Function]}
              onWheel={[Function]}
              type="text"
              value={152}
            />
            <div>
              G
            </div>
          </div>
          <div
            className="css-1xnfy-ColorPicker"
          >
            <input
              autoComplete="off"
              className="css-1j3bwou"
              onChange={[Function]}
              onKeyDown={[Function]}
              onWheel={[Function]}
              type="text"
              value={219}
            />
            <div>
              B
            </div>
          </div>
          <div
            className="css-1xnfy-ColorPicker"
          >
            <input
              autoComplete="off"
              className="css-1j3bwou"
              onChange={[Function]}
              onKeyDown={[Function]}
              onWheel={[Function]}
              type="text"
              value={100}
            />
            <div>
              A
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>,
  <span
    className="css-g41xyj-InputColor"
    id="reference500000"
    onClick={[Function]}
  >
    <span
      className="css-gmziuu-InputColor"
      style={
        Object {
          "backgroundColor": "#3498db",
        }
      }
    />
  </span>,
]
`);
});
