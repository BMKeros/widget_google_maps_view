{
    'name': 'Widget Google Maps View',
    'version': '1.0.0',
    "author": "BMKeros",
    "website": "http://bmkeros.org.ve",
    'license': '',
    'category': 'Odoo  widgets',
    'depends': [
        'base_setup'
        'web'
    ],
    'data': [
        'views/widget_google_maps_assets.xml',
        'views/res_config_views.xml'
    ],
    'qweb': [
        'static/src/xml/resource.xml'
    ],
    'installable': True,
    'application': False
}
