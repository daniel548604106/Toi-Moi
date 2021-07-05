import React, { useState, useEffect, useRef } from 'react';
import { backgroundSelections } from '../../utils/storyOptions';
import { Stage, Layer, Rect, Text, Transformer, Image } from 'react-konva';
import useImage from 'use-image';
import useClickOutside from '../../hooks/useClickOutside';
import Konva from 'konva';

const Preview = ({ storyInfo, text, setSelectedIdx, stageRef }) => {
  // Image
  const [storyImage, setStoryImage] = useState(storyImage);
  const [image] = useImage(storyImage);
  useEffect(() => {
    console.log(storyInfo.image);
    setStoryImage(storyInfo.image);
  }, [storyInfo]);

  // Text
  const [textPosition, setTextPosition] = useState({
    isDragging: false,
    x: 220,
    y: 330
  });
  const shapeRef = useRef();
  const trRef = useRef();
  const [rect, setRect] = useState({
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: 'green',
    id: 'rect2'
  });
  const [isSelected, setSelected] = useState(false);

  // Turn into an image
  const downloadURI = (uri, name) => {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  return (
    <div className="mx-3 rounded-lg w-full  p-3 bg-secondary border">
      <h2 className="mb-3">預覽</h2>
      <div className="rounded-lg bg-black w-full p-3 flex items-center justify-center">
        <div className=" rounded-lg bg-white">
          {storyInfo.type && storyInfo.type === 'image' ? (
            <Stage ref={stageRef} width="440" height="660">
              <Layer padding="20">
                <Image image={image} />
                <Text
                  text={text || '請輸入文字'}
                  fontSize={18}
                  x={textPosition.x}
                  y={textPosition.y}
                  draggable
                  fill={textPosition.isDragging ? '#F7797D' : 'black'}
                  onDragStart={() => {
                    setTextPosition((textPosition) => ({
                      ...textPosition,
                      isDragging: true
                    }));
                  }}
                  onDragEnd={(e) => {
                    setTextPosition({
                      isDragging: false,
                      x: e.target.x(),
                      y: e.target.y()
                    });
                    console.log(e.target.x(), e.target.y());
                  }}
                  onClick={() => setSelected(true)}
                  onTap={() => setSelected(true)}
                  ref={shapeRef}
                  onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    setRect({
                      ...rect,
                      x: node.x(),
                      y: node.y(),
                      // set minimal value
                      width: Math.max(5, node.width() * scaleX),
                      height: Math.max(node.height() * scaleY)
                    });
                  }}
                />
                {isSelected && (
                  <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                      // limit resize
                      if (newBox.width < 5 || newBox.height < 5) {
                        return oldBox;
                      }
                      return newBox;
                    }}
                  />
                )}
              </Layer>
            </Stage>
          ) : (
            <div>
              <Stage ref={stageRef} width="440" height="660">
                <Layer padding="20">
                  <Text
                    text={text || '請輸入文字'}
                    fontSize={18}
                    x={textPosition.x}
                    y={textPosition.y}
                    draggable
                    fill={textPosition.isDragging ? '#F7797D' : 'black'}
                    onDragStart={() => {
                      setTextPosition((textPosition) => ({
                        ...textPosition,
                        isDragging: true
                      }));
                    }}
                    onDragEnd={(e) => {
                      setTextPosition({
                        isDragging: false,
                        x: e.target.x(),
                        y: e.target.y()
                      });
                      console.log(e.target.x(), e.target.y());
                    }}
                    onClick={() => setSelected(true)}
                    onTap={() => setSelected(true)}
                    ref={shapeRef}
                    onTransformEnd={(e) => {
                      // transformer is changing scale of the node
                      // and NOT its width or height
                      // but in the store we have only width and height
                      // to match the data better we will reset scale on transform end
                      const node = shapeRef.current;
                      const scaleX = node.scaleX();
                      const scaleY = node.scaleY();
                      setRect({
                        ...rect,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY)
                      });
                    }}
                  />
                  {isSelected && (
                    <Transformer
                      ref={trRef}
                      boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                          return oldBox;
                        }
                        return newBox;
                      }}
                    />
                  )}
                </Layer>
              </Stage>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
