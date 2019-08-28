import React, { PureComponent } from 'react'
import { getSol, getPhotos } from '../../modules/RoverPhotos'
import { fetchPhotosRequest } from '../../modules/RoverPhotos/actions'
import { connect } from 'react-redux'
import RoverPhotos from '../RoverPhotos'
import SelectSol from '../SelectSol'
import styles from './RoversViewer.module.css'

// Здесь вам нужно реализовать вью

// Подключите его к редакс роутеру
// Вам потребуются селекторы для получения выбранного сола
// и списка фотографий

// Так же вы будете диспатчить экшены CHANGE_SOL и FETCH_PHOTOS_REQUEST
// Эти экшены находятся в модуле ROVER PHOTOS

class RoverViewer extends PureComponent {
    componentDidMount() {
        const { sol } = this.props
        this.getPhotos(sol.current)
    }

    getRoversName = () => {
        const { photos } = this.props
        return Object.keys(photos)
    }

    getPhotos = sol => {
        const { fetchPhotosRequest } = this.props
        const nameRovers = this.getRoversName()
        nameRovers.forEach(name => {
            fetchPhotosRequest({ name, sol })
        })
    }

    changeSol = val => {
        this.getPhotos(val)
    }

    render() {
        const { sol, photos } = this.props;
        const { current, min, max } = sol;
        const nameRovers = this.getRoversName();
    
        return (
            <div className={styles.root}>
                <SelectSol minSol={min} maxSol={max} selectedSol={current} changeSol={this.changeSol}/>
                <div className={styles.сontainer}>
                {nameRovers.map(item => {
                    const currentPhotos = photos[item][current] ? photos[item][current].photos : [];
             
                return (
                    photos[item][current] && (
                        <RoverPhotos key={item} photos={currentPhotos} name={item}/>
                    )
                )})}
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
    sol: getSol(state),
    photos: getPhotos(state)
    }),
    { fetchPhotosRequest }
)(RoverViewer)