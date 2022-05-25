from flask import Flask, jsonify
from flask_restful import Resource
import geopandas as gpd
import pandas as pd

from conf import test_url

class WoredaList(Resource):

    def get(self):
        """
        Get all woredas

        ---
        responses:
          200:
            description: All woredas

        """
        # Reading wfs into geodataframe
        geo_data_frame = gpd.read_file(test_url)
        # Casting to pandas dataframe (easy to manipulate)
        kebeles_data_frame = pd.DataFrame(geo_data_frame)
        # Dropping 'geometry' column
        kebeles_data_frame.drop('geometry', inplace=True, axis=1)
        return kebeles_data_frame.to_json(orient='records')

class Woreda(Resource):

    def get(self, woreda_id):
        """
        Get a specific woreda
        Examples of woreda_id: woreda1
        ---
        parameters:
          - in: path
            name: woreda_id
            type: string
            required: true
        responses:
          200:
            description: A single woreda
            schema:
              id: Woreda
              properties:
                fid:
                  type: string
                  description: fid
                  default: sample_kebele.4
                Shape_Area:
                  type: integer
                  description: shape area
                  default: 0.00
                Woreda:
                  type: string
                  description: The woreda id
                  default: Woreda1
                kebele:
                  type: string
                  description: The kebele id
                  default: Kebele1
                N:
                  type: integer
                  description: Nitrogen data
                  default: 0.00
                P:
                  type: integer
                  description: Phosphorus data
                  default: 0.00
                K:
                  type: integer
                  description: Potassium data
                  default: 0.00
        """
        # Reading wfs into geodataframe
        geo_data_frame = gpd.read_file(test_url)
        # Casting to pandas dataframe (easy to manipulate)
        kebeles_data_frame = pd.DataFrame(geo_data_frame)
        # Dropping 'geometry' column
        kebeles_data_frame.drop('geometry', inplace=True, axis=1)

        search_for = woreda_id.lower()
        result = kebeles_data_frame[kebeles_data_frame['Woreda']
                                    == search_for.capitalize()]

        if not result.empty:
            return result.to_json(orient='records')
        else:
            return 'No woreda found with id: ' + woreda_id, 404

