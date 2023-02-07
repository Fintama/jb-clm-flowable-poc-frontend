// create a json schema with the following variables - material with values "plastic" and "metal",
// color with values "black", "gold", "blue", "silver" and limit of type number wth a maximum value of 10000 if color is blue
// max 20k if color is silver and max 50k if color is gold and max 500k if color is black
// if color is gold, then add a new property named insurance of type boolean
// if color is gold and insurance is true, then add a new property named coverage of type number with a maximum value of 50k if material is not metal
// and a maximum of 100k if material is metal
// if color is black and insurance is true, then add a new property named coverage with a maximum of 100k if the material is not metal
// and a maximum of 200k if the material is metal

export const schema = {
  type: 'object',
  properties: {
    material: {
      type: 'string',
      enum: ['plastic', 'metal'],
    },
    color: {
      type: 'string',
      enum: ['black', 'gold', 'blue', 'silver'],
    },
    limit: {
      type: 'number',
      maximum: {
        if: {
          properties: {
            color: {
              const: 'blue',
            },
          },
        },
        then: 10000,
        else: {
          if: {
            properties: {
              color: {
                const: 'silver',
              },
            },
          },
          then: 20000,
          else: {
            if: {
              properties: {
                color: {
                  const: 'gold',
                },
              },
            },
            then: 50000,
            else: {
              if: {
                properties: {
                  color: {
                    const: 'black',
                  },
                },
              },
              then: 500000,
              else: 0,
            },
          },
        },
      },
    },
    insurance: {
      type: 'boolean',
      if: {
        properties: {
          color: {
            const: 'gold',
          },
        },
      },
      then: {
        type: 'boolean',
      },
    },
    coverage: {
      type: 'number',
      if: {
        properties: {
          color: {
            const: 'gold',
          },
          insurance: {
            const: true,
          },
        },
      },
      then: {
        type: 'number',
        maximum: {
          if: {
            properties: {
              material: {
                const: 'metal',
              },
            },
          },
          then: 100000,
          else: 50000,
        },
      },
      else: {
        if: {
          properties: {
            color: {
              const: 'black',
            },
            insurance: {
              const: true,
            },
          },
        },
        then: {
          type: 'number',
          maximum: {
            if: {
              properties: {
                material: {
                  const: 'metal',
                },
              },
            },
            then: 200000,
            else: 100000,
          },
        },
      },
    },
  },
};